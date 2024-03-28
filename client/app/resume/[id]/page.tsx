"use client";

import React, { useState } from "react";
import { ResumeCareer } from "@/components/resume/resume-career";
import { ResumeTitle } from "@/components/resume/resume-title";
import { ResumeCareerTextarea } from "@/components/resume/resume-career-textarea";
import { ResumeEducation } from "@/components/resume/resume-education";
import { ResumeSkill } from "@/components/resume/resume-skill";
import { ResumeAward } from "@/components/resume/resume-award";
import { ResumeLanguage } from "@/components/resume/resume-language";
import ResumeCancleButton from "@/components/resume/resume-cancle-button";
import HeadingText from "@/components/heading-text";
import { Button } from "@/components/ui/button";

export default function ResumeEditor(id: string) {
  /* GET 요청에 대한 응답이 없으면 404 오류 페이지를 표시합니다 */
  /*const response = await fetch(`${baseUrl}/api/resume/${id}`)
    .then((res) => res.json())
    .catch(() => notFound());
  const resumeBody: ResumeBody = response.parse();
  */
  const resumeLoadData = {
    title: "제목입니다만?",
    careerData: [
      { date: "2019-08 ~ 2020-10", content: "경력" },
      { date: "2019-08 ~ 2020-10", content: "경력2" },
    ],
    careerText: "경력 세부내용",
    education: [
      { date: "2019-08 ~ 2020-10", content: "학력" },
      { date: "2019-08 ~ 2020-10", content: "학력2" },
    ],
    skill: "스킬",
    award: [
      { date: "2019-08 ~ 2020-10", content: "수상" },
      { date: "2019-08 ~ 2020-10", content: "수상2" },
    ],
    language: "외국어",
  };

  const [formData, setFormData] = useState({
    title: "",
    careerData: [{ date: "", content: "" }],
    careerText: "",
    education: [{ date: "", content: "" }],
    skill: "",
    award: [{ date: "", content: "" }],
    language: "",
  });

  // 자식 컴포넌트에서 전달된 값 처리
  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    // try {
    //   bearerToken 설정부분
    //   const bearerToken = "token";

    //   fetch(`http://localhost/api/resume/${id}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${bearerToken}`,
    //     },
    //     body: JSON.stringify(formData),
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("이력서 데이터 전송 실패!");
    //       }
    //       return response.json();
    //     })
    //     .then((responseData) => {
    //       console.log(responseData);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="자기소개서 생성에 필요한 최소의 정보를 입력해 주세요.">
        이력서
      </HeadingText>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <form className="w-full" onSubmit={handleSubmit}>
        <ResumeTitle
          titleData={resumeLoadData.title}
          onInputChange={(value) => handleInputChange("title", value)}
        />
        <ResumeCareer
          onInputChange={(value) => handleInputChange("careerData", value)}
        />
        <ResumeCareerTextarea
          onInputChange={(value) => handleInputChange("careerText", value)}
        />
        <ResumeEducation
          onInputChange={(value) => handleInputChange("education", value)}
        />
        <ResumeSkill
          onInputChange={(value) => handleInputChange("skill", value)}
        />
        <ResumeAward
          onInputChange={(value) => handleInputChange("award", value)}
        />
        <ResumeLanguage
          onInputChange={(value) => handleInputChange("language", value)}
        />
        <div className="flex justify-center items-center gap-4 mt-10">
          <ResumeCancleButton />
          <Button type="submit">저장</Button>
        </div>
      </form>
    </main>
  );
}
