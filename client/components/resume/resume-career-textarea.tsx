"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { resumeContents } from "@/config/resume-id-contents";

export function ResumeCareerTextarea({
  careerTextData,
  onInputChange,
}: {
  careerTextData: string;
  onInputChange: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  // 컴포넌트가 로드될 때 careerTextData를 초기 값으로 설정
  useEffect(() => {
    setInputValue(careerTextData);
  }, [careerTextData]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // 입력 값 부모 컴포넌트로 전달
    onInputChange(value);
  };

  return (
    <div className="justify-start w-full my-3">
      <Textarea
        placeholder={inputValue ? "" : resumeContents.textareaContent}
        className="pt-7 my-5 ml-10 h-40"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
