import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { AtSymbolIcon, HashtagIcon, KeyIcon } from "@heroicons/react/outline";
const DashboardPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useLayoutEffect(() => {
    localStorage.getItem("token") && router.push("/admin/dashboard");
  }, []);
  return <>
  
  </>;
};

export default DashboardPage;
