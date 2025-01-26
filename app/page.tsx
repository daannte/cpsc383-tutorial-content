import { allTutorials, Tutorial } from "content-collections";
import Link from "next/link";

interface TutorialsByWeek {
  [key: string]: Tutorial[];
}

const isWeekDisabled = (tutorials: Tutorial[]): boolean => {
  return (
    tutorials.length > 0 && tutorials.every((tutorial) => tutorial.disabled)
  );
};

const tutorials = allTutorials.reduce<TutorialsByWeek>((acc, tutorial) => {
  const week = tutorial.week;
  if (!acc[week]) {
    acc[week] = [];
  }
  acc[week].push(tutorial);
  return acc;
}, {});

const sortedWeeks = Object.keys(tutorials).sort((a, b) => {
  const weekA = parseInt(a.replace(/\D/g, ""), 10);
  const weekB = parseInt(b.replace(/\D/g, ""), 10);
  return weekB - weekA;
});

sortedWeeks.forEach((week) => {
  tutorials[week].sort((a, b) => a.tutorial - b.tutorial);
});

const formatWeek = (week: string) => {
  return `WEEK ${week.replace(/\D/g, "")}`;
};

export default function Home() {
  return (
    <div className="mt-16">
      <h1 className="text-5xl font-medium">Tutorials</h1>
      <div className="mt-16">
        {sortedWeeks.map((week) => {
          const weekDisabled = isWeekDisabled(tutorials[week]);

          return (
            <div key={week} className={`mb-8 ${weekDisabled ? "hidden" : ""}`}>
              <h4 className="text-emerald-600">{formatWeek(week)}</h4>
              <div className="mt-2 space-y-4">
                {tutorials[week].map((tutorial, index) => {
                  const content = (
                    <div className="group">
                      <div
                        className={`flex items-baseline justify-between ${
                          index === 1 ? "mt-8" : ""
                        }`}
                      >
                        <h3 className="text-xl font-medium group-hover:underline">
                          {tutorial.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-gray-500 line-clamp-2">
                        {
                          tutorial.content
                            .split("\n")
                            .filter((line) => !line.startsWith("#"))[1]
                        }
                      </p>
                    </div>
                  );

                  return (
                    <Link
                      className={`${tutorial.disabled ? "hidden" : ""}`}
                      href={`/tutorials/${tutorial.slug}`}
                      key={index}
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
