import StoryCard from "./StoryCard";
import { getCurrentUsersStories } from "@/lib/data/stories";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function Stories() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/signin");
  }

  const usersStories = await getCurrentUsersStories(user.id);

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10 flex flex-col gap-6 min-h-screen items-center">
      <h1 className="text-2xl mx-auto">My Stories</h1>

      {usersStories.length === 0 && <p>You haven't written any stories yet.</p>}

      {usersStories.map((story) => (
        <StoryCard
          key={story.id}
          id={story.id}
          prompt={story.prompt}
          storyText={story.story}
          dateCreated={story.dateCreated.substring(0, 10)}
          imageSrc={story.imageSrc ?? ""}
        />
      ))}
    </div>
  );
}
