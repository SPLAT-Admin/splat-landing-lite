"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = "https://usesplat.com/admin";
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
      }}
    >
      <h2>Redirecting to SPL@T Admin Dashboard...</h2>
    </div>
  );
}
