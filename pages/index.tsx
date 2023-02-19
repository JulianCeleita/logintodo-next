import Head from "next/head";
import Login from "../components/Login";
import UserDashboard from "../components/UserDashboard";
import { AuthContextType, useAuth } from "../context/AuthContext";

export default function Home() {
  const { currentUser }: AuthContextType = useAuth();

  return (
    <>
      <Head>
        <title>Todo List Firebase</title>
        <meta name="description" content="New todo app with firebase, typescript, tailwind and next 12" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      {!currentUser && <Login />}
      {currentUser && <UserDashboard />}
    </>
  );
}
