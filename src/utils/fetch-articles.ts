// Fonction pour extraire le texte brut depuis Lexical
function extractText(lexicalContent: any): string {
  if (!lexicalContent?.root?.children) return ''

  let text = ''
  function traverse(nodes: any[]) {
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
  const data = await response.json()

  console.log('=== ARTICLES ===\n')

  data.docs.forEach((article: any, index: number) => {
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
