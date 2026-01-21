
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"

const pageLinks = [
  { path: "/", label: "Home" },
  { path: "/create", label: "Create" },
  { path: "/archive", label: "Archive" },
]

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className=" border-b ">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        
        {}
        <h1 className="text-xl font-bold text-indigo-700">
          Recipe Vault
        </h1>

        {}
        <nav className="flex gap-6">
          {pageLinks.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <Button
                key={link.path}
                variant={isActive ? "default" : "outline"}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

  

