"use server";

import { revalidateTag } from "next/cache";
import { supabase } from "@/app/_lib/supabaseClient";

export type SubscribeNewsletterInput = {
  email: string;
};

export async function subscribeNewsletter(
  data: SubscribeNewsletterInput
): Promise<{ success: boolean; message: string }> {
  try {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      };
    }

    // Prepare the data for insertion
    const insertData = {
      email: data.email.toLowerCase().trim(),
      is_active: true,
    };

    const { data: result, error } = await supabase
      .from("newsletter_subscribers")
      .insert([insertData])
      .select("id")
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        // PostgreSQL unique violation code
        return {
          success: false,
          message: "This email is already subscribed to our newsletter",
        };
      }

      console.error("❌ Error subscribing to newsletter:", error.message);
      return {
        success: false,
        message: `Failed to subscribe: ${error.message}`,
      };
    }

    // ✅ Revalidate cache after successful subscription
    revalidateTag("newsletter-subscribers");

    console.log("✅ Newsletter subscription successful:", result);
    return {
      success: true,
      message: "Successfully subscribed to newsletter!",
    };
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
