// import fs from "fs";
// import path from "path";
// import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  // const design = req.body; // Получаем настройки из запроса

  // const fileName = "sample.json";

  // // // Создаем путь к файлу
  // const filePath = path.join(process.cwd(), "public", fileName);

  // console.log("filePath", filePath);
  // fs.writeFileSync(filePath, JSON.stringify(data));

  // console.dir(Response);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-disposition": "attachment; filename=sample.json",
    },
  });
}
