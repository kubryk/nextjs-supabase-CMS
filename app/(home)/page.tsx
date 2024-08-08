'use server'
import { Feed } from "@/components/home/Feed";
import AuthButton from "../../components/auth/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <Feed currentPage={currentPage} />
    </>
  );
}
