import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  const { args = [] } = await req.json(); // e.g. { "args": ["--generate-alerts"] }

  const command = `python data_integration/alerts/main.py ${args.join(' ')}`;
  try {
    const { stdout } = await execPromise(command);
    return NextResponse.json({ result: stdout });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}