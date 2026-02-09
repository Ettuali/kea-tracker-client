import ProjectsPage from "./pages/ProjectsPage";
import { Toaster } from 'react-hot-toast';

// Add "export default" right here
export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ProjectsPage />
    </>
  );
}