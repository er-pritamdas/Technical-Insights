export const aiPromptsData = [
  {
    title: "Learn anything faster",
    category: "Learning & Education",
    icon: "🚀",
    context: "Accelerated Learning & Study Planning",
    tools: ["ChatGPT", "Claude", "Gemini"],
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    prompt: `[SUBJECT]=Topic or skill to learn
[CURRENT_LEVEL]=Starting knowledge level (beginner/intermediate/advanced)
[TIME_AVAILABLE]=Weekly hours available for learning
[LEARNING_STYLE]=Preferred learning method (visual/auditory/hands-on/reading)
[GOAL]=Specific learning objective or target skill level

Step 1: Knowledge Assessment

1. Break down [SUBJECT] into core components
2. Evaluate complexity levels of each component
3. Map prerequisites and dependencies
4. Identify foundational concepts
   Output detailed skill tree and learning hierarchy

~ Step 2: Learning Path Design

1. Create progression milestones based on [CURRENT_LEVEL]
2. Structure topics in optimal learning sequence
3. Estimate time requirements per topic
4. Align with [TIME_AVAILABLE] constraints
   Output structured learning roadmap with timeframes

~ Step 3: Resource Curation

1. Identify learning materials matching [LEARNING_STYLE]:
   - Video courses
   - Books/articles
   - Interactive exercises
   - Practice projects
2. Rank resources by effectiveness
3. Create resource playlist
   Output comprehensive resource list with priority order

~ Step 4: Practice Framework

1. Design exercises for each topic
2. Create real-world application scenarios
3. Develop progress checkpoints
4. Structure review intervals
   Output practice plan with spaced repetition schedule

~ Step 5: Progress Tracking System

1. Define measurable progress indicators
2. Create assessment criteria
3. Design feedback loops
4. Establish milestone completion metrics
   Output progress tracking template and benchmarks

~ Step 6: Study Schedule Generation

1. Break down learning into daily/weekly tasks
2. Incorporate rest and review periods
3. Add checkpoint assessments
4. Balance theory and practice
   Output detailed study schedule aligned with [TIME_AVAILABLE]`
  },
  {
    title: "The Reverse Brief Prompt",
    category: "Thinking & Strategy",
    icon: "📝",
    context: "Strategic Problem Definition & Clarity",
    tools: ["ChatGPT", "Claude", "Gemini"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    prompt: `I want to achieve [describe the outcome you think you want].
Do not give me strategies, steps, frameworks, or advice yet.
Before proposing any solution, your only task is to deeply understand the problem.

Start by asking me exactly 5 high-quality clarifying questions that help uncover:

Constraints
– limits around time, budget, tools, skills, authority, or external dependencies

Resources
– people, tools, data, budget, audience, systems, or leverage I already have access to

Timeline & urgency
– deadlines, milestones, and whether speed or quality matters more

Success criteria
– how success will be measured, what “done” actually looks like, and what would make this a clear win

The real objective
– identify whether my stated goal is a proxy for a deeper or different outcome (e.g., status, revenue, freedom, validation, risk reduction)

Rules:
Ask the questions one at a time, in logical order
Make each question specific, non-generic, and decision-shaping
Challenge assumptions if something sounds vague or misaligned
Do not suggest solutions, tactics, or examples until all 5 questions are answered`
  },
  {
    title: "Build a Strong Company Culture",
    category: "Business & Management",
    icon: "🏢",
    context: "Organizational Development & HR",
    tools: ["ChatGPT", "Claude", "Gemini"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    prompt: `Act as an experienced organizational culture and people-ops advisor. Create a practical, actionable plan to help [company] build a strong, healthy, and scalable company culture. Your response should include:

A clear strategy to foster a culture of innovation, with initiatives that encourage creative thinking, collaboration, and safe experimentation.

Specific recommendations to promote diversity and inclusion across hiring, training, leadership development, and internal policies.

Initiatives to support employee wellness and work-life balance, including flexible work models, mental and physical health programs, and stress-management resources.

A framework for continuous learning and professional development, covering training programs, mentorship, feedback loops, and access to learning tools.

Guidance on defining and reinforcing core values and ethical standards that guide daily behavior, decision-making, and alignment with the company’s mission.

Team-building ideas and rituals that strengthen relationships, improve communication, and create a sense of belonging.

A recognition and rewards system that consistently acknowledges high performance, impact, and behaviors aligned with company values.

Communication practices that promote transparency, trust, and engagement across all levels of the organization.

Focus on practical steps, examples, and systems that can scale as the company grows.`
  },
  {
    title: "Read long articles faster",
    category: "Learning & Education",
    icon: "📖",
    context: "Reading Assistant & Summarization",
    tools: ["ChatGPT", "Claude", "Gemini"],
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    prompt: `You are a reading assistant. The user will provide you with an article to read. Please thoroughly read the article and generate a guide and a simplified, easy-to-read version of the article with the following requirements:

-- Your output:

Mind Map: First, generate a mind map for the entire guide.

Summary: Next, provide a summary of the entire text, limited to 400 words.

Simplified Article: Then, present your rewritten, simplified, and easy-to-read version of the article.

-- Requirements for Rewriting:

Word Count: Compress the word count to half of the original, and ensure it does not exceed 3,000 words.

Author’s Tone: Simulate the original author's tone.

Formatting: Format the output to ensure a visually appealing layout and ease of reading.

Visual Elements: Insert tables, charts, diagrams, SVGs, and other visual elements in appropriate places to enhance readability.`
  },
  {
    title: "High-End Consulting Slide Generation",
    category: "Business & Productivity",
    icon: "📊",
    context: "Analyze Global EV market",
    tools: ["Kimi AI"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    prompt: `Analyze Global EV market opportunities.

Requirement:
A professional, high-density consulting presentation slide, designed in the style of a top-tier strategy firm (McKinsey/BCG) blended with high-end editorial aesthetics.

Core Content & Layout:

1. Rich Data Visualization: The slide is populated with complex, precise charts (stacked bar charts, waterfall charts, or line graphs) and detailed data tables with rows and columns.
2. Structured Frameworks: Includes strategic diagrams or 2x2 matrices constructed with thin, clean lines.
3. High Information Density: The layout is sophisticated and multi-column, mimicking an actual business analysis deck, not just an empty cover page.

Visual Style:

1. Aesthetic: Tech-minimalist but information-heavy. Clean, sharp, and authoritative.
2. Typography: Serif fonts (like Times New Roman) for the main headlines to give a premium financial report feel; clean Sans-serif for chart labels and data numbers.
3. Color Palette: Clean white background. Text is sharp black. Charts and graphical accents use Deep Royal Blue and distinct shades of grey for data hierarchy.
4. Graphics: Use fine hairline borders for tables and precise vector lines for graphs.`
  },
  {
    title: "Job Match Decoder",
    category: "Career & Growth",
    icon: "👔",
    context: "Career & Interview Prep",
    tools: ["ChatGPT", "Claude", "Gemini"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    prompt: `You are a senior recruiter and hiring manager combined.

Analyze the following job description and reverse-engineer what actually gets candidates interviewed — not generic requirements.

Job description:
[Paste job description here]

Your tasks:
Must-Have Skills (Non-Negotiables)
Identify the 5–8 skills that are critical for this role
Separate true requirements from “nice-to-haves”
Experience & Achievements That Signal Fit
Extract the types of past roles, accomplishments, or outcomes that would strongly impress the hiring team
Focus on proof of impact (results, scale, ownership)

Hidden Signals & Subtext
Call out any implied expectations (seniority level, pace, autonomy, stakeholder exposure, ambiguity tolerance)

Resume & ATS Keywords
List the exact keywords, phrases, and terminology likely used to screen resumes and LinkedIn profiles

Interview-Driving Signals
Explain what would make a recruiter say: “This person should be interviewed”
Include examples of phrasing or bullets that would trigger that reaction

Common Misinterpretations to Avoid
Highlight requirements candidates often misunderstand or over-emphasize

Output format:
Use clear section headers
Be concise but specific
Avoid generic career advice
Optimize for resume tailoring and interview prep`
  },
  {
    title: "Improve Clarity and Readability",
    category: "Writing & Editing",
    icon: "✍️",
    context: "Editing & Refinement",
    tools: ["ChatGPT", "Claude", "Gemini"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    prompt: `You are an expert editor specializing in clear, concise, and easy-to-read writing.

Your task is to edit the text below to maximize clarity, logical flow, and readability while preserving the original meaning and intent.

Guidelines:
Remove unnecessary words, filler, and repetition
Tighten sentences without oversimplifying ideas
Improve logical flow and transitions between sentences
Break up long or complex sentences where needed
Replace vague or confusing phrasing with clear, concrete language
Maintain the original tone and voice
Do not add new ideas or opinions

[paste text here]`
  },
  {
    title: "Deep Researcher",
    category: "Research & Analysis",
    icon: "🔍",
    context: "Deep Dive Research & Critical Analysis",
    tools: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    prompt: `I'm researching [topic]. First, break down this topic into 5 key questions that experts would ask. Then for each question: 1) Provide the mainstream view with specific examples, 2) Identify 2-3 contrarian perspectives that challenge this view, 3) Explain what data or evidence would prove each side right. Finally, synthesize this into a framework I can use to evaluate new information on this topic.`
  }
];
