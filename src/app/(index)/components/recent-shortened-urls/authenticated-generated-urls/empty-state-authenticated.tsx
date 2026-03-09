import { BarChart3, ListChecks, Link2Icon } from "lucide-react"

const benefits = [
  {
    icon: ListChecks,
    title: "Ver historial de tus enlaces acortados",
  },
  {
    icon: BarChart3,
    title: "Ver estadísticas de tus enlaces acortados",
  },
  {
    icon: Link2Icon,
    title: "Crear enlaces acortados permanentes o temporales",
  },
]

export default function EmptyStateAuthenticated() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4">
      <div className="text-center">
        <h3 className="text-foreground text-lg font-semibold sm:text-xl">
          Aún no tienes enlaces acortados
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Ya tienes todas las funciones desbloqueadas. Así puedes aprovecharlas:
        </p>
      </div>
      <ol className="flex w-fit flex-col gap-2">
        {benefits.map(({ icon: Icon, title }) => (
          <li key={title} className="flex items-center gap-2">
            <Icon aria-hidden className="size-4" />
            <span>{title}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
