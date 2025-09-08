<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = '../data/products.json';

// Função para ler dados do arquivo JSON
function readData() {
    global $dataFile;
    
    if (!file_exists($dataFile)) {
        return null;
    }
    
    $content = file_get_contents($dataFile);
    return json_decode($content, true);
}

// Função para salvar dados no arquivo JSON
function saveData($data) {
    global $dataFile;
    
    // Criar diretório se não existir
    $dir = dirname($dataFile);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($dataFile, $json) !== false;
}

// Função para obter próximo ID disponível
function getNextId($products) {
    $maxId = 0;
    foreach ($products as $category) {
        if (isset($category['products'])) {
            foreach ($category['products'] as $product) {
                if (isset($product['id']) && $product['id'] > $maxId) {
                    $maxId = $product['id'];
                }
            }
        }
    }
    return $maxId + 1;
}

// Função para obter próximo ID de categoria
function getNextCategoryId($data) {
    $maxId = 0;
    foreach ($data as $categoryId => $category) {
        if (strpos($categoryId, 'cat_') === 0) {
            $id = (int)str_replace('cat_', '', $categoryId);
            if ($id > $maxId) {
                $maxId = $id;
            }
        }
    }
    return 'cat_' . ($maxId + 1);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Carregar dados
        $data = readData();
        if ($data === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Arquivo de dados não encontrado']);
        } else {
            echo json_encode($data);
        }
        break;
        
    case 'POST':
        // Salvar dados
        $input = json_decode(file_get_contents('php://input'), true);
        
        if ($input === null) {
            http_response_code(400);
            echo json_encode(['error' => 'Dados JSON inválidos']);
            break;
        }
        
        if (saveData($input)) {
            echo json_encode(['success' => true, 'message' => 'Dados salvos com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao salvar dados']);
        }
        break;
        
    case 'PUT':
        // Atualizar produto específico
        $input = json_decode(file_get_contents('php://input'), true);
        
        if ($input === null) {
            http_response_code(400);
            echo json_encode(['error' => 'Dados JSON inválidos']);
            break;
        }
        
        $data = readData();
        if ($data === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Arquivo de dados não encontrado']);
            break;
        }
        
        // Atualizar produto
        if (isset($input['categoryId']) && isset($input['productId']) && isset($input['product'])) {
            $categoryId = $input['categoryId'];
            $productId = $input['productId'];
            $product = $input['product'];
            
            if (isset($data[$categoryId]['products'])) {
                foreach ($data[$categoryId]['products'] as &$p) {
                    if ($p['id'] == $productId) {
                        $p = $product;
                        break;
                    }
                }
            }
        }
        
        if (saveData($data)) {
            echo json_encode(['success' => true, 'message' => 'Produto atualizado com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao atualizar produto']);
        }
        break;
        
    case 'DELETE':
        // Deletar produto
        $input = json_decode(file_get_contents('php://input'), true);
        
        if ($input === null) {
            http_response_code(400);
            echo json_encode(['error' => 'Dados JSON inválidos']);
            break;
        }
        
        $data = readData();
        if ($data === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Arquivo de dados não encontrado']);
            break;
        }
        
        // Deletar produto
        if (isset($input['categoryId']) && isset($input['productId'])) {
            $categoryId = $input['categoryId'];
            $productId = $input['productId'];
            
            if (isset($data[$categoryId]['products'])) {
                $data[$categoryId]['products'] = array_filter($data[$categoryId]['products'], function($p) use ($productId) {
                    return $p['id'] != $productId;
                });
                $data[$categoryId]['products'] = array_values($data[$categoryId]['products']);
            }
        }
        
        if (saveData($data)) {
            echo json_encode(['success' => true, 'message' => 'Produto deletado com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao deletar produto']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        break;
}
?>
