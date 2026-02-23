import { Clock, Lock } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

import CreateTemporalyShortenUrl from "./create-temporaly-shorten-url"
import CreatePermanentShortenUrl from "./create-permanent-shorten-url"

export default function CreateShortenURL() {
  return (
    <div className="mt-8 flex w-full flex-col items-start gap-3">
      <Tabs className="flex w-full" defaultValue="temporaly">
        <TabsList>
          <TabsTrigger value="temporaly">
            <Clock />
            Temporaly
          </TabsTrigger>
          <TabsTrigger disabled value="permanent">
            <Lock />
            Permanent
          </TabsTrigger>
        </TabsList>
        <TabsContent className="min-h-17" value="temporaly">
          <CreateTemporalyShortenUrl />
        </TabsContent>
        <TabsContent className="min-h-17" value="permanent">
          <CreatePermanentShortenUrl />
        </TabsContent>
      </Tabs>
    </div>
  )
}
