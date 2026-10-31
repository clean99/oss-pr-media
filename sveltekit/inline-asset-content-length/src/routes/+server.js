import { read } from '$app/server';
import icon from './icon.svg?inline';

export function GET() {
  return read(icon);
}
