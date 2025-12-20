// Types pour le contenu Lexical
interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[]
}

interface LexicalContent {
  root?: {
    children?: LexicalNode[]
  }
}

interface Article {
  title: string
  status: string
  publishedDate: string
  content: LexicalContent
  featuredImage?: {
    url: string
  }
}

interface ArticlesResponse {
  docs: Article[]
  totalDocs: number
}

// Fonction pour extraire le texte brut depuis Lexical
function extractText(lexicalContent: LexicalContent): string {
  if (!lexicalContent?.root?.children) return ''

  let text = ''
  function traverse(nodes: LexicalNode[]) {
    for (const node of nodes) {
      if (node.type === 'text') {
        text += node.text
      }
      if (node.children) {
        traverse(node.children)
      }
    }
  }
  traverse(lexicalContent.root.children)
  return text
}

async function fetchArticles() {
  const response = await fetch('http://localhost:3000/api/articles')
  const data = (await response.json()) as ArticlesResponse

  console.log('=== ARTICLES ===\n')

  data.docs.forEach((article: Article, index: number) => {
    console.log(`${index + 1}. ${article.title}`)
    console.log(`   Statut: ${article.status}`)
    console.log(`   Date: ${article.publishedDate}`)
    console.log(`   Contenu: ${extractText(article.content)}`)
    console.log(`   Image: ${article.featuredImage?.url || 'Aucune'}`)
    console.log('')
  })

  console.log(`Total: ${data.totalDocs} article(s)`)
}

// Exécuter la fonction
fetchArticles()
  .then(() => console.log('✅ Terminé'))
  .catch((error) => console.error('❌ Erreur:', error))
