import remarkParse from 'remark-parse';
import { unified } from 'unified';

interface Node {
  type: string;
  url?: string;
  value?: string;
  children?: Node[];
}

async function markdownToAST(markdown: string) {
  return await unified().use(remarkParse).parse(markdown);
}

function searchFirstImage(node: Node): string | undefined {
  if (node.type === "image") {
    return node.url;
  } else if (node.children) {
    for (const child of node.children) {
      const url: string | undefined = searchFirstImage(child);
      if (url) {
        return url;
      }
    }
  }
  return undefined;
}

function stripeText(node: Node, text: string): string {
  if (node.type === "text") {
    return text + node.value;
  } else if (node.children) {
    for (const child of node.children) {
      text = stripeText(child, text);
    }
  }
  return text;
}

export async function extractHeadImage(markdown: string) {
  const ast = await markdownToAST(markdown);
  return searchFirstImage(ast);
}

export async function extractPostSummary(markdown: string) {
  const body = markdown.split("\n").slice(1).join("\n");
  const ast = await markdownToAST(body);
  let text = stripeText(ast, "");
  if (text.length > 140) {
    text = text.substring(0, 140).trim();
    text = text
      .substring(0, 120)
      .trim()
      .replace(/[,!\?]?\s+[^\s]+$/, '…');
  }
  return text;
}
