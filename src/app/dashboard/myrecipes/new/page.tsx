import prisma from "@/prisma/connection";
import CreateRecipeForm from "@/ui/dashboard/forms";

export default async function Page() {

  const dbTags = await prisma.tag.findMany({
    select: {
      name: true,
    }
  });

  const tags = dbTags.map((tag) => {
    return tag.name;
  });



  return (
    <div>
      < CreateRecipeForm tags={tags} />
    </div>
  )
}