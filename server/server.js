const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const app = express();
const port = 3000;
let UserCounter = 1;
const auth = require("./middleware");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const problems = [
  {
    id: "1",
    title: "9. Palindrome Number",
    difficulty: "Easy",
    acceptance: "53.8%",
    discription:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    exampleInput: {
      input: "x = 121",
      output: "true",
    },
  },
  {
    id: "2",
    title: "1396. Design Underground System",
    difficulty: "Medium",
    acceptance: "74.5%",
    discription:
      "An underground railway system is keeping track of customer travel times between different stations. They are using this data to calculate the average time it takes to travel from one station to another.      ",
    exampleInput: {
      input:
        '["UndergroundSystem","checkIn","checkIn","checkIn","checkOut","checkOut","checkOut","getAverageTime","getAverageTime","checkIn","getAverageTime","checkOut","getAverageTime"][[],[45,"Leyton",3],[32,"Paradise",8],[27,"Leyton",10],[45,"Waterloo",15],[27,"Waterloo",20],[32,"Cambridge",22],["Paradise","Cambridge"],["Leyton","Waterloo"],[10,"Leyton",24],["Leyton","Waterloo"],[10,"Waterloo",38],["Leyton","Waterloo"]]',
      output:
        "[null,null,null,null,null,null,null,14.00000,11.00000,null,11.00000,null,12.00000]",
    },
  },
  {
    id: "3",
    title: "2. Add Two Numbers",
    difficulty: "Medium",
    acceptance: "40.6%",
    discription:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    exampleInput: {
      input: "l1 = [2,4,3], l2 = [5,6,4]",
      output: "[7,0,8]",
    },
  },
  {
    id: "4",
    title: "4. Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "36.5%",
    discription:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.The overall run time complexity should be O(log (m+n)).",
    exampleInput: {
      input: "nums1 = [1,3], nums2 = [2]",
      output: "2.00000",
    },
  },
  {
    id: "5",
    title: "10. Palindrome Number",
    difficulty: "Medium",
    acceptance: "53.8%",
    discription:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    exampleInput: {
      input: "x = 121",
      output: "true",
    },
  },
  {
    id: "6",
    title: "96. Design Underground System",
    difficulty: "Hard",
    acceptance: "7.5%",
    discription:
      "An underground railway system is keeping track of customer travel times between different stations. They are using this data to calculate the average time it takes to travel from one station to another.      ",
    exampleInput: {
      input:
        '["UndergroundSystem","checkIn","checkIn","checkIn","checkOut","checkOut","checkOut","getAverageTime","getAverageTime","checkIn","getAverageTime","checkOut","getAverageTime"][[],[45,"Leyton",3],[32,"Paradise",8],[27,"Leyton",10],[45,"Waterloo",15],[27,"Waterloo",20],[32,"Cambridge",22],["Paradise","Cambridge"],["Leyton","Waterloo"],[10,"Leyton",24],["Leyton","Waterloo"],[10,"Waterloo",38],["Leyton","Waterloo"]]',
      output:
        "[null,null,null,null,null,null,null,14.00000,11.00000,null,11.00000,null,12.00000]",
    },
  },
  {
    id: "7",
    title: "1. Add Two Numbers",
    difficulty: "Easy",
    acceptance: "90.6%",
    discription:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    exampleInput: {
      input: "l1 = [2,4,3], l2 = [5,6,4]",
      output: "[7,0,8]",
    },
  },
  {
    id: "8",
    title: "4. Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "36.5%",
    discription:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.The overall run time complexity should be O(log (m+n)).",
    exampleInput: {
      input: "nums1 = [1,3], nums2 = [2]",
      output: "2.00000",
    },
  },
];

const submissions = [];
const users = [];
app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.get("/problems", (req, res) => {
  const problemList = problems.map((problem) => ({
    problemId: problem.id,
    title: problem.title,
    difficulty: problem.difficulty,
    acceptance: problem.acceptance,
  }));
  res.status(200).json({ problems: problemList });
});

app.get("/problem/:id", (req, res) => {
  const id = req.params.id;
  const problem = problems.find((problem) => problem.id === id);
  res.status(200).json({ problem: problem });
});

app.post("/signup", (req, res) => {
  // const body = JSON.stringify(req.body);
  const email = req.body.email;
  const username = req.body.name;
  const password = req.body.password;

  const userPresent = users.find((user) => user.userEmail === email);
  if (userPresent) {
    return res.status(409).json({
      msg: "User Arleady Present",
    });
  }
  users.push({
    userEmail: email,
    name: username,
    userPassword: password,
    userId: UserCounter,
  });
  UserCounter = UserCounter + 1;
  res.json({
    msg: "User Signup Successful",
  });
});
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userPresent = users.find((user) => user.userEmail === email);

  if (!userPresent) {
    return res.status(409).json({
      msg: "User Not Present",
    });
  }
  if (userPresent.userPassword !== password) {
    return res.status(403).json({
      msg: "Password Not Correct",
    });
  }

  const token = jwt.sign(
    {
      id: userPresent.userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    msg: "Login Successful",
    token: token,
  });
});
app.post("/submissions", auth, (req, res) => {
  const isCorrect = Math.random() <= 0.5;
  const problemId = req.body.id;
  const userSubmission = req.body.submission;

  if (isCorrect) {
    submissions.push({
      userId: req.userId,
      problemId: problemId,
      status: "Ac",
      submission: userSubmission,
    });
    res.status(200).json({
      status: "Ac",
    });
  } else {
    submissions.push({
      userId: req.userId,
      problemId: problemId,
      status: "Nc",
      submission: userSubmission,
    });
    res.status(200).json({
      status: "Nc",
    });
  }
});
app.get("/submission/:problemId", auth, (req, res) => {
  const problemId = req.params.problemId;
  const userId = req.userId;
  const submissionList = submissions.filter(
    (subb) => subb.userId == userId && subb.problemId == problemId //string problemId int userId
  );
  if (!submissionList) {
    res.status(403).json({
      msg: "NO Submissions yet",
    });
  }
  res.status(200).json({
    submissions: submissionList,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
