export const handler = async (event, context) => {
  // Vérifier que la méthode est autorisée
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Récupérer les variables d'environnement
  const apiKey = process.env.VITE_API_KEY;
  const userKey = process.env.VITE_USER_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' })
    };
  }

  // Construire l'URL de l'API MetaMob
  const path = event.path.replace('/.netlify/functions/metamob-proxy', '');
  const apiUrl = `https://api.metamob.fr${path}`;
  
  // Ajouter les query parameters s'ils existent
  const queryString = event.queryStringParameters ? 
    '?' + new URLSearchParams(event.queryStringParameters).toString() : '';
  
  const fullApiUrl = apiUrl + queryString;

  // Préparer les headers
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'HTTP-X-APIKEY': apiKey,
    'User-Agent': 'Mozilla/5.0 (compatible; MetaMob-Client)'
  };

  // Ajouter la clé utilisateur pour les requêtes PUT
  if (event.httpMethod === 'PUT' && userKey) {
    headers['HTTP-X-USERKEY'] = userKey;
  }

  try {
    const response = await fetch(fullApiUrl, {
      method: event.httpMethod,
      headers,
      body: event.httpMethod === 'PUT' ? event.body : undefined
    });

    const data = await response.text();
    
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS'
      },
      body: data
    };
  } catch (error) {
    console.error('Error calling MetaMob API:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch data from MetaMob API',
        details: error.message 
      })
    };
  }
};
