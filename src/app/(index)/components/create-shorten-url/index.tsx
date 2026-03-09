import { Clock, Lock } from "lucide-react"
import { User } from "better-auth"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

import CreateTemporalyShortenUrl from "./create-temporaly-shorten-url"
import CreatePermanentShortenUrl from "./create-permanent-shorten-url"

interface CreateShortenURLProps {
  isAuthenticated: boolean
  user: User | null
}

export default function CreateShortenURL(props: CreateShortenURLProps) {
  const { isAuthenticated, user } = props

  return (
    <div className="mt-8 flex w-full flex-col items-start gap-3">
      <Tabs className="flex w-full" defaultValue="temporaly">
        <TabsList>
          <TabsTrigger value="temporaly">
            <Clock />
            Temporaly
          </TabsTrigger>
          <TabsTrigger value="permanent">
            <Lock />
            Permanent
          </TabsTrigger>
        </TabsList>
        <TabsContent className="min-h-17" value="temporaly">
          <CreateTemporalyShortenUrl isAuthenticated={isAuthenticated} user={user} />
        </TabsContent>
        <TabsContent className="min-h-17" value="permanent">
          <CreatePermanentShortenUrl isAuthenticated={isAuthenticated} user={user} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
