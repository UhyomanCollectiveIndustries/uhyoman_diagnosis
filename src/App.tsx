import { useState } from "react";
import "./App.css";

type Choice = { label: string; value: "A" | "B" | "C" };
type Question = { text: string; choices: [Choice, Choice, Choice] };

const questions: Question[] = [
  {
    text: "あなたはうひょですか？",
    choices: [
      { label: "はい、うひょです", value: "A" },
      { label: "いいえ、うひょではありません", value: "B" },
      { label: "うひょ～ん…", value: "C" },
    ],
  },
  {
    text: "カラオケでうひょしますか？",
    choices: [
      { label: "静かにうひょる", value: "A" },
      { label: "大声でうっひょ～！と叫ぶ", value: "B" },
      { label: "泣きそうにうひょ～ん…", value: "C" },
    ],
  },
  {
    text: "友達にうひょと言われたら？",
    choices: [
      { label: "「うひょ。」と冷静に返す", value: "A" },
      { label: "「うっひょ～～！！」と全力で返す", value: "B" },
      { label: "「うひょ～ん…」としょんぼり返す", value: "C" },
    ],
  },
  {
    text: "朝起きたときのテンションは？",
    choices: [
      { label: "うひょ（普通）", value: "A" },
      { label: "うっひょ～！（最高潮）", value: "B" },
      { label: "うひょ～ん…（低め）", value: "C" },
    ],
  },
  {text: "うひょの語源は？",
   choices: [
     { label: "うひょ～！と叫んだときの擬音", value: "A" },
     { label: "うひょ～！と叫んだときの擬音", value: "B" },
     { label: "うひょ～！と叫んだときの擬音", value: "C" },
   ]
  },
  {
    text: "うひょを漢字で書くと？",
    choices: [
      { label: "宇表", value: "A" },
      { label: "卯秘ョ", value: "B" },
      { label: "鬱豹", value: "C" },
    ],
  },
  {
    text: "うひょの好きな色は？",
    choices: [
      { label: "青", value: "A" },
      { label: "赤", value: "B" },
      { label: "緑", value: "C" },
    ],
  },
  {
    text: "うひょの好きな食べ物は？",
    choices: [
      { label: "アイスクリーム", value: "A" },
      { label: "チョコレート", value: "B" },
      { label: "ケーキ", value: "C" },
    ],
  },
  {
    text: "うひょの好きな季節は？",
    choices: [
      { label: "春", value: "A" },
      { label: "夏", value: "B" },
      { label: "秋", value: "C" },
    ],
  },
  {
    text: "うひょの年齢は？",
    choices: [
      { label: "20歳", value: "A" },
      { label: "35歳", value: "B" },
      { label: "45歳", value: "C" },
    ],
  },
  {
    text: "お酒を飲むときのうひょは？",
    choices: [
      { label: "うひょ～！と楽しく飲む", value: "A" },
      { label: "うっひょ～！とテンション爆上げで飲む", value: "B" },
      { label: "うひょ～ん…としんみり飲む", value: "C" },
    ],
  },
  {
    text: "自分のうひょレベルを自己評価すると？",
    choices: [
      { label: "標準的なうひょ", value: "A" },
      { label: "超絶うっひょ～！", value: "B" },
      { label: "絶望的なうひょ～ん…", value: "C" },
    ],
  },
];

type Result = {
  type: string;
  description: string;
};

const results: Record<"A" | "B" | "C", Result> = {
  A: {
    type: "うひょまんタイプ",
    description: "王道のうひょ。落ち着いていて安定感のあるうひょです。どんな場面でもブレない、真のうひょまんと言えるでしょう。",
  },
  B: {
    type: "うっひょ～タイプ",
    description: "テンションアゲアゲタイプのうひょです！周りを巻き込む熱量と、いつでも全力のうっひょ～が最大の魅力！",
  },
  C : {
    type: "うひょ～んタイプ",
    description: "うひょ～ん…と落ち込むこともある、繊細なうひょです。そんなあなたは、うひょ～んタイプの可能性大！",
  }
};

type Phase = "start" | "quiz" | "result";

export default function App() {
  const [phase, setPhase] = useState<Phase>("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Array<"A" | "B" | "C">>([]);

  const handleStart = () => {
    setAnswers([]);
    setCurrent(0);
    setPhase("quiz");
  };

  const handleChoice = (value: "A" | "B" | "C") => {
    const next = [...answers, value];
    setAnswers(next);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setPhase("result");
    }
  };

  const getResult = (): Result => {
    const countB = answers.filter((a) => a === "B").length;
    const countC = answers.filter((a) => a === "C").length;
    if (countB >= Math.ceil(questions.length / 2)) {
      return results.B;
    } else if (countC >= Math.ceil(questions.length / 2)) {
      return results.C;
    } else {
      return results.A;
    }
  };

  const handleRetry = () => {
    setPhase("start");
  };

  return (
    <div className="uhyo-app">
      {phase === "start" && (
        <div className="card start-card">
          <div className="uhyo-logo-box">U</div>
          <h1>ウヒョマン診断</h1>
          <p className="subtitle">あなたはどのうひょタイプ？<br />全 {questions.length} 問の質問に答えてみよう！</p>
          <button className="btn-primary" onClick={handleStart}>
            診断スタート！
          </button>
        </div>
      )}

      {phase === "quiz" && (
        <div className="card quiz-card">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((current) / questions.length) * 100}%` }}
            />
          </div>
          <p className="question-count">Q{current + 1} / {questions.length}</p>
          <h2 className="question-text">{questions[current].text}</h2>
          <div className="choices">
            {questions[current].choices.map((choice) => (
              <button
                key={choice.value}
                className="btn-choice"
                onClick={() => handleChoice(choice.value)}
              >
                <span className="choice-label">{choice.value}</span>
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "result" && (() => {
        const result = getResult();
        return (
          <div className="card result-card">
             <div className="kawaii-wrap">
               <div className="kawaii kawaii__ice-cream kawaii--pink kawaii--foot">
                 <div className="kawaii__face kawaii__face--eyes-normal"></div>
               </div>
             </div>
            <p className="result-lead">あなたは…</p>
            <h2 className="result-type">{result.type}</h2>
            <p className="result-desc">{result.description}</p>
            <button className="btn-primary" onClick={handleRetry}>
              もう一度診断する
            </button>
          </div>
        );
      })()}
    </div>
  );
}
