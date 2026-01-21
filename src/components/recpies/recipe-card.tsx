// import { Card, CardDescription, CardTitle } from "../ui/card";

// interface RecipieCardProps {
//     index: string
//     title: string;
//     description: string
// }

// export default function RecipieCard({ index, title, description }: RecipieCardProps) {
//     return <Card className="p-3 hover:cursor-pointer" key={index}>
//         <CardTitle>
//             {title}
//         </CardTitle>
//         <CardDescription>
//             {description}
//         </CardDescription>
//     </Card>
// }

import { Card, CardDescription, CardTitle } from "../ui/card";

interface RecipieCardProps {
  index: string
  title: string;
  description: string
}

export default function RecipieCard({ index, title, description }: RecipieCardProps) {
  return (
    <Card
      key={index}
      className="p-4 space-y-2 rounded-xl border bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <CardTitle className="text-lg font-semibold text-slate-800">
        {title}
      </CardTitle>

      <CardDescription className="text-slate-500 line-clamp-2">
        {description}
      </CardDescription>
    </Card>
  );
}
