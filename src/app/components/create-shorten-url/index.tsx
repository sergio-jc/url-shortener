import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import CreateTemporalyShortenUrl from "./create-temporaly-shorten-url";
import { Clock, Lock } from "lucide-react";
import CreatePermanentShortenUrl from "./create-permanent-shorten-url";

export default function CreateShortenURL() {

  return (
    <div className="flex w-full flex-col items-start gap-3 mt-8">
      <Tabs defaultValue="temporaly" className="flex w-full">
        <TabsList>
          <TabsTrigger value="temporaly">
            <Clock />
            Temporaly
          </TabsTrigger>
          <TabsTrigger value="permanent" disabled>
            <Lock />
            Permanent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="temporaly" className="min-h-17">
          <CreateTemporalyShortenUrl />
        </TabsContent>
        <TabsContent value="permanent" className="min-h-17">
          <CreatePermanentShortenUrl />
        </TabsContent>
      </Tabs>
    </div>
  );
}
