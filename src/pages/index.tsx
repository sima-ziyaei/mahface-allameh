import Categories from "@/components/Categories";
import Layout from "@/components/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`p-4`}>
      <Layout>
        <Categories />
      </Layout>
    </main>
  );
}
