import Layout from "@/components/Layout";
import axios from "axios";
import React from "react";

function NewTeacherSignup() {
  function handleCreateNewTeacher(body) {
    return axios.post(process.env.BASE_URL + "/api/Teacher/Create", {});
  }

  return (
    <Layout>
      <div>Teacher</div>
    </Layout>
  );
}

export default NewTeacherSignup;
