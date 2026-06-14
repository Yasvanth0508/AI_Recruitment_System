const skillMap: Record<string, string> = {

  "node": "Node.js",
  "nodejs": "Node.js",

  "reactjs": "React",
  "react.js": "React",

  "js": "JavaScript",

  "ts": "TypeScript",

  "postgres": "PostgreSQL",

  "springboot": "Spring Boot",
};

export function normalizeSkills(
  skills: string[]
): string[] {

  return skills.map((skill) => {

    const key =
      skill
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");

    return skillMap[key] || skill;
  });
}