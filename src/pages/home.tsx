import RecipeList from "@/components/recpies/recipe-list";

export default function Home() {
  return (
    <div className="min-h-screen">
      
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Grandma’s Recipes 
          </h1>
          <p className="text-slate-500">
            Preserve your family’s delicious memories
          </p>
        </div>

        {}
        <div className="flex justify-center">
          <RecipeList />
        </div>
      </div>
    </div>
  );
}
