import ProjectsPage from "@/components/ProjectsPage";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/projects";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <ProjectsPage projects={projects} />
      <Footer />
    </>
  );
}