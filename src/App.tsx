import { useEffect } from "react";

import { useToggle } from "./hooks";

import { NotesPage, PreviewPage } from "./pages";

function App() {
  const [isOpen, toggleIsOpen] = useToggle(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      toggleIsOpen();
    }, 3500);
    return () => clearTimeout(handler);
  }, [toggleIsOpen]);

  return (
    <>
      {isOpen && <PreviewPage />}
      <NotesPage />
    </>
  );
}

export default App;
