"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  //todo change loading spinner
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div
        className="spinner-border w-16 h-16"
        role="status"
        style={{ color: "#167F60" }}
      ></div>
    </div>
  );
}

export { Redirect };
