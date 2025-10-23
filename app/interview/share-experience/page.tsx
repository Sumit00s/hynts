"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { submitInterviewExperience } from "@/app/actions/interviews/submitInterview";

export default function ShareInterviewPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    is_anonymous: false,
    work_experience: "",
    current_job_role: "",
    about_yourself: "",
    company_name: "",
    job_position_applied: "",
    difficulty_level: "",
    interview_timeline: "",
    application_source: "",
    interview_mode: "",
    number_of_rounds: "",
    interview_result: "",
    salary_range: "",
    preparation_tips: "",
    general_advice: "",
  });

  const [rounds, setRounds] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "number_of_rounds") {
      const num = Number(value);
      if (!isNaN(num) && num > 0) {
        const newRounds = Array.from({ length: num }, (_, i) => ({
          round_name: `Round ${i + 1}`,
          round_type: "",
          round_mode: "",
          difficulty_level: "",
          duration: "",
          summary: "",
        }));
        setRounds(newRounds);
      } else {
        setRounds([]);
      }
    }
  };

  const handleRoundChange = (index: number, field: string, value: string) => {
    const updatedRounds = [...rounds];
    updatedRounds[index][field] = value;
    setRounds(updatedRounds);
  };

  const handleAnonymousToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_anonymous: checked,
      full_name: checked ? "Anonymous" : "",
      email: checked ? "" : prev.email,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const dataToSubmit = { ...formData, round_details: rounds };
      const result = await submitInterviewExperience(dataToSubmit);

      if (result.success) {
        setSuccessMsg(result.message);
        setSubmitted(true);

        // Reset form after successful submission
        setFormData({
          full_name: "",
          email: "",
          is_anonymous: false,
          work_experience: "",
          current_job_role: "",
          about_yourself: "",
          company_name: "",
          job_position_applied: "",
          difficulty_level: "",
          interview_timeline: "",
          application_source: "",
          interview_mode: "",
          number_of_rounds: "",
          interview_result: "",
          salary_range: "",
          preparation_tips: "",
          general_advice: "",
        });
        setRounds([]);
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 py-12 font-lexend">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-playfair">
          Share Your Interview Experience
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Help others by sharing your insights and interview journey 🌱
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-gray-100 rounded-2xl p-8 space-y-8"
      >
        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <Label className="text-gray-600 font-medium">Post as Anonymous</Label>
          <Switch
            checked={formData.is_anonymous}
            onCheckedChange={handleAnonymousToggle}
          />
        </div>

        {/* Personal Info */}
        {!formData.is_anonymous && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label className="block mb-2 text-gray-500 text-sm">
                Full Name
              </Label>
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="p-5 border-gray-300 focus:ring-2 focus:ring-gray-200"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <Label className="block mb-2 text-gray-500 text-sm">Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="p-5 border-gray-300 focus:ring-2 focus:ring-gray-200"
                placeholder="youremail@gmail.com"
              />
            </div>
          </div>
        )}

        {/* Work Info */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Work Experience
            </Label>
            <select
              name="work_experience"
              value={formData.work_experience}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Experience</option>
              {[
                "0-1 year",
                "1-2 years",
                "2-3 years",
                "3-4 years",
                "4-5 years",
                "5+ years",
              ].map((exp) => (
                <option key={exp}>{exp}</option>
              ))}
            </select>
          </div>

          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Current Job Role
            </Label>
            <Input
              name="current_job_role"
              value={formData.current_job_role}
              onChange={handleChange}
              className="p-5 border-gray-300 focus:ring-2 focus:ring-gray-200"
              placeholder="Frontend Engineer"
            />
          </div>
        </div>

        {/* About Yourself */}
        <div>
          <Label className="block mb-2 text-gray-500 text-sm">
            About Yourself
          </Label>
          <Textarea
            name="about_yourself"
            value={formData.about_yourself}
            onChange={handleChange}
            className="p-3 border-gray-300 focus:ring-2 focus:ring-gray-200"
            placeholder="Brief background and interests..."
          />
        </div>

        {/* Interview Details */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Company Name
            </Label>
            <Input
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="p-5 border-gray-300 focus:ring-2 focus:ring-gray-200"
              placeholder="Google"
              required
            />
          </div>
          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Job Position Applied
            </Label>
            <Input
              name="job_position_applied"
              value={formData.job_position_applied}
              onChange={handleChange}
              className="p-5 border-gray-300 focus:ring-2 focus:ring-gray-200"
              placeholder="Software Engineer Intern"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Difficulty Level
            </Label>
            <select
              name="difficulty_level"
              value={formData.difficulty_level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Difficulty</option>
              {["Easy", "Medium", "Hard"].map((lvl) => (
                <option key={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Interview Timeline
            </Label>
            <select
              name="interview_timeline"
              value={formData.interview_timeline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Timeline</option>
              {[
                "0-1 week",
                "1-2 weeks",
                "2-3 weeks",
                "3-4 weeks",
                "4-5 weeks",
                "5-6 weeks",
                "6+ weeks",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Application Source
            </Label>
            <select
              name="application_source"
              value={formData.application_source}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Source</option>
              {[
                "OnCampus",
                "Career Fair",
                "LinkedIn",
                "Twitter",
                "Job Portal",
                "Company Career Page",
                "Referral",
                "Walk-in",
                "Cold Email",
              ].map((src) => (
                <option key={src}>{src}</option>
              ))}
            </select>
          </div>

          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Interview Mode
            </Label>
            <select
              name="interview_mode"
              value={formData.interview_mode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Mode</option>
              {[
                "Remote",
                "Online",
                "Hybrid",
                "Onsite",
                "Telephonic",
                "Other",
              ].map((mode) => (
                <option key={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Rounds */}
        <div>
          <Label className="block mb-2 text-gray-500 text-sm">
            Number of Rounds
          </Label>
          <select
            name="number_of_rounds"
            value={formData.number_of_rounds}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Select Rounds</option>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Round Details */}
        {rounds.length > 0 && (
          <div className="space-y-6 mt-6 border-t border-gray-100 pt-6">
            <h2 className="font-semibold text-lg text-gray-800 font-playfair">
              Round Details
            </h2>
            {rounds.map((round, index) => (
              <div
                key={index}
                className="p-5 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-sm transition-all space-y-4"
              >
                <div>
                  <Label className="block mb-2 text-gray-500 text-sm">
                    Round Name
                  </Label>
                  <Input
                    value={round.round_name}
                    onChange={(e) =>
                      handleRoundChange(index, "round_name", e.target.value)
                    }
                    className="p-5 border-gray-300 focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <Label className="block mb-2 text-gray-500 text-sm">
                    Round Type
                  </Label>
                  <select
                    value={round.round_type}
                    onChange={(e) =>
                      handleRoundChange(index, "round_type", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Select Type</option>
                    {[
                      "HR",
                      "Managerial",
                      "Technical",
                      "Behavioral",
                      "Case Study",
                      "System Design",
                      "Coding Test",
                      "Aptitude Test",
                      "Group Discussion",
                      "Cultural Fit",
                      "Final Interview",
                      "Leadership",
                      "Offer Discussion",
                    ].map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="block mb-2 text-gray-500 text-sm">
                    Round Mode
                  </Label>
                  <select
                    value={round.round_mode}
                    onChange={(e) =>
                      handleRoundChange(index, "round_mode", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Select Mode</option>
                    {[
                      "Remote",
                      "Online",
                      "Hybrid",
                      "Onsite",
                      "Telephonic",
                      "Other",
                    ].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="block mb-2 text-gray-500 text-sm">
                    Difficulty Level
                  </Label>
                  <select
                    value={round.difficulty_level}
                    onChange={(e) =>
                      handleRoundChange(
                        index,
                        "difficulty_level",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Select Difficulty</option>
                    {["Easy", "Medium", "Hard"].map((lvl) => (
                      <option key={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="block mb-2 text-gray-500 text-sm">
                    Duration
                  </Label>
                  <Input
                    value={round.duration}
                    onChange={(e) =>
                      handleRoundChange(index, "duration", e.target.value)
                    }
                    className="p-5 border-gray-300 focus:ring-2 focus:ring-gray-200"
                    placeholder="45 mins"
                  />
                </div>

                <div>
                  <Label className="block mb-2 text-gray-500 text-sm">
                    Round Summary
                  </Label>
                  <Textarea
                    value={round.summary}
                    onChange={(e) =>
                      handleRoundChange(index, "summary", e.target.value)
                    }
                    className="p-3 border-gray-300 focus:ring-2 focus:ring-gray-200"
                    placeholder="Questions asked, approach, feedback..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Result + Salary */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Interview Result
            </Label>
            <select
              name="interview_result"
              value={formData.interview_result}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Result</option>
              {["Selected", "Rejected", "Ghosted"].map((res) => (
                <option key={res}>{res}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="block mb-2 text-gray-500 text-sm">
              Salary Range
            </Label>
            <Input
              name="salary_range"
              value={formData.salary_range}
              onChange={handleChange}
              className="p-5 border-gray-300 focus:ring-2 focus:ring-gray-200"
              placeholder="₹15 LPA - ₹25 LPA"
            />
          </div>
        </div>

        {/* Tips + Advice */}
        <div>
          <Label className="block mb-2 text-gray-500 text-sm">
            Preparation Tips
          </Label>
          <Textarea
            name="preparation_tips"
            value={formData.preparation_tips}
            onChange={handleChange}
            className="p-3 border-gray-300 focus:ring-2 focus:ring-gray-200"
            placeholder="Your preparation strategy, resources used..."
          />
        </div>

        <div>
          <Label className="block mb-2 text-gray-500 text-sm">
            General Advice
          </Label>
          <Textarea
            name="general_advice"
            value={formData.general_advice}
            onChange={handleChange}
            className="p-3 border-gray-300 focus:ring-2 focus:ring-gray-200"
            placeholder="Tips for future candidates..."
          />
        </div>

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-600 text-center font-medium mt-3">
            ❌ {errorMsg}
          </p>
        )}

        {/* Success Message */}
        {successMsg && (
          <p className="text-green-600 text-center font-medium mt-3">
            ✅ {successMsg}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white hover:bg-gray-800 transition-all mt-4 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Experience"}
        </Button>
      </form>
    </section>
  );
}
