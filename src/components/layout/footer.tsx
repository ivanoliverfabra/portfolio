export function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-16 bg-background/50 z-[50] fixed bottom-0 text-primary gap-x-2 backdrop-blur-lg">
      <p>&copy; {new Date().getFullYear()}</p>
      <p>Ivan Oliver</p>
    </footer>
  );
}
