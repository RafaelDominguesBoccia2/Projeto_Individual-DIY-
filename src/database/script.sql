CREATE DATABASE IF NOT EXISTS diy;

USE diy;


-- =====================================================================
-- 1. TABELAS
-- =====================================================================

-- Dados de cadastro
CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
senha_hash VARCHAR(64) NOT NULL,
dt_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Categorias dos experimentos
CREATE TABLE categoria (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(20) NOT NULL UNIQUE
);

-- Catálogo de experimentos 
CREATE TABLE experimento (
id INT PRIMARY KEY AUTO_INCREMENT,
codigo VARCHAR(20) NOT NULL UNIQUE,
nome VARCHAR(60) NOT NULL,
descricao VARCHAR(150),
tempo_min INT NOT NULL,
nivel VARCHAR(15) NOT NULL,
utensilios VARCHAR(45),
supervisao VARCHAR(150),
CONSTRAINT const_tempo_experimento
	CHECK (tempo_min > 0),
CONSTRAINT const_nivel_experimento
	CHECK (nivel IN ('FÁCIL', 'INTERMEDIÁRIO', 'AVANÇADO'))
);

-- Um experimento pode ter mais de uma categoria
-- Relação N:N -> chave primária composta.
CREATE TABLE experimento_categoria (
fk_experimento INT,
fk_categoria INT,
PRIMARY KEY (fk_experimento, fk_categoria),
CONSTRAINT const_fk_expcat_exp
	FOREIGN KEY (fk_experimento) REFERENCES experimento(id),
CONSTRAINT const_fk_expcat_cat
	FOREIGN KEY (fk_categoria) REFERENCES categoria(id)
);

-- Catálogo de materiais 
CREATE TABLE material (
id INT PRIMARY KEY AUTO_INCREMENT,
codigo VARCHAR(20) NOT NULL UNIQUE,
nome VARCHAR(45) NOT NULL,
tipo VARCHAR(20) NOT NULL,
detalhe VARCHAR(60),
unidade VARCHAR(10) NOT NULL,
passo INT NOT NULL DEFAULT 1,
quantidade_inicial INT NOT NULL DEFAULT 0,
CONSTRAINT const_mat_passo
	CHECK (passo > 0),
CONSTRAINT const_mat_qtd_inicial
	CHECK (quantidade_inicial >= 0)
);

-- O que cada experimento precisa
CREATE TABLE experimento_material (
fk_experimento INT,
fk_material INT,
qtd INT NOT NULL,
PRIMARY KEY (fk_experimento, fk_material),
CONSTRAINT const_fk_expmat_exp
	FOREIGN KEY (fk_experimento) REFERENCES experimento(id),
CONSTRAINT const_fk_expmat_mat
	FOREIGN KEY (fk_material) REFERENCES material(id),
CONSTRAINT const_expmat_qtd
	CHECK (qtd > 0)
);

-- Estoque do usuário
CREATE TABLE estoque_usuario (
fk_usuario INT,
fk_material INT,
quantidade INT NOT NULL DEFAULT 0,
dt_atualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (fk_usuario, fk_material),
CONSTRAINT const_fk_estoq_usuario
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
CONSTRAINT const_fk_estoq_mat
	FOREIGN KEY (fk_material) REFERENCES material(id),
CONSTRAINT const_estoq_qtd
	CHECK (quantidade >= 0)
);

-- Projetos feitos
CREATE TABLE projeto_feito (
fk_usuario INT,
fk_experimento INT,
dt_feito DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (fk_usuario, fk_experimento),
CONSTRAINT const_fk_feito_usuario
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
CONSTRAINT const_fk_feito_exp
	FOREIGN KEY (fk_experimento) REFERENCES experimento(id)
);


-- =====================================================================
-- 2. INSERTS DO CATÁLOGO
-- =====================================================================

INSERT INTO categoria (nome) VALUES
('ENGENHARIA'),
('FÍSICA'),       
('QUÍMICA');      

INSERT INTO experimento (codigo, nome, descricao, tempo_min, nivel, utensilios, supervisao) VALUES
('ponte', 'Uma ponte de papel', 'Como uma simples dobra deixa o papel mais resistente?', 30, 'FÁCIL', 'régua', NULL),                                 
('helicoptero', 'Helicóptero de papel', 'Recorte, dobre e veja seu helicóptero girar enquanto cai.', 30, 'FÁCIL', 'tesoura e lápis', 'Adulto faz os cortes. Solte sem subir em móveis.'),
('labirinto', 'Labirinto de papelão', 'Crie caminhos e guie uma bolinha de papel até a saída.', 45, 'INTERMEDIÁRIO', 'tesoura e lápis', 'Adulto faz os cortes. Não leve a bolinha à boca.'),
('vulcao', 'Vulcão em erupção', 'Faça uma reação efervescente colorida dentro de um vulcão de papelão.', 45, 'AVANÇADO', 'colher e tesoura', 'Use recipiente aberto. Faça em superfície protegida. Não tampar nem ingerir.'),
('foguete', 'Foguete de vinagre e bicarbonato', 'A reação química gera gás e pressão que propulsionam uma garrafa PET. Atividade externa obrigatória.', 60, 'AVANÇADO', 'tesoura',
'Somente ao ar livre, longe de pessoas. Adulto monta e aponta o foguete. Risco de projeção e pressão. Não vedar a garrafa.'), 
('carrinho', 'Carrinho de papelão', 'Monte um carrinho com rodas giratórias a partir de materiais recicláveis.', 75, 'INTERMEDIÁRIO', 'tesoura e lápis', 'Adulto deve cortar e furar o papelão com cuidado.');

INSERT INTO experimento_categoria (fk_experimento, fk_categoria) VALUES
(1, 1),            -- ponte       -> Engenharia
(2, 2),            -- helicóptero -> Física
(3, 1),            -- labirinto   -> Engenharia
(4, 3),            -- vulcão      -> Química
(5, 3), (5, 2),    -- foguete     -> Química + Física
(6, 1);            -- carrinho    -> Engenharia

INSERT INTO material
(codigo, nome, tipo, detalhe, unidade, passo, quantidade_inicial) VALUES
('fita', 'Fita adesiva', 'MONTAGEM', 'Transparente · 18 mm', 'cm', 10, 250), 
('papel', 'Papel A4', 'PAPÉIS', 'Folhas reaproveitadas valem!', 'folhas', 1, 6),   
('copos', 'Copos plásticos', 'RECIPIENTES', 'Transparentes · 200 ml', 'un.', 1, 3),    
('vinagre', 'Vinagre', 'INGREDIENTES', 'Vinagre branco', 'ml', 10, 100), 
('bicarbonato', 'Bicarbonato', 'INGREDIENTES', 'Bicarbonato de sódio', 'g', 1, 20),
('corante', 'Corante alimentício', 'INGREDIENTES', 'Líquido · cor à sua escolha', 'ml', 1, 10),   
('papelao', 'Papelão fino', 'PAPÉIS', 'Placa de 20 × 20 cm', 'un.', 1, 1),    
('garrafa', 'Garrafa PET', 'RECIPIENTES', '500 ml · vazia e limpa', 'un.', 1, 0),    
('tampas', 'Tampas de garrafa', 'RECIPIENTES', 'Plásticas · diversas cores', 'un.', 1, 0),    
('palitos', 'Palitos de churrasco', 'MONTAGEM', 'Bambu · eixo do carrinho', 'un.', 1, 0);   

INSERT INTO experimento_material (fk_experimento, fk_material, qtd) VALUES
-- 1 ponte
(1, 2, 3), (1, 3, 2),
-- 2 helicóptero
(2, 2, 1), (2, 1, 20),
-- 3 labirinto
(3, 7, 1), (3, 2, 2), (3, 1, 100),
-- 4 vulcão
(4, 7, 1), (4, 1, 1), (4, 4, 150), (4, 5, 30), (4, 6, 5),
-- 5 foguete
(5, 8, 1), (5, 4, 50), (5, 5, 10), (5, 2, 1), (5, 1, 1),
-- 6 carrinho
(6, 7, 1), (6, 1, 1), (6, 9, 4), (6, 10, 2);


-- =====================================================================
-- 3. VIEWS 
-- =====================================================================

-- Login:
CREATE VIEW vw_login AS
SELECT
	u.id AS id_usuario,
	u.nome,
	u.email,
	u.senha_hash
FROM usuario u;

-- KPI: Projetos realizados
CREATE VIEW vw_dash_projetos AS
SELECT
	u.id AS id_usuario,
	COUNT(pf.fk_experimento) AS projetos_realizados,
	(SELECT COUNT(*) FROM experimento) AS total_experimentos
FROM usuario u
	LEFT JOIN projeto_feito pf
		ON pf.fk_usuario = u.id
GROUP BY u.id;

-- KPI: Materiais diferentes usados
CREATE VIEW vw_dash_materiais AS
SELECT
	u.id AS id_usuario,
	COUNT(DISTINCT em.fk_material) AS materiais_usados,
	(SELECT COUNT(*) FROM material) AS total_materiais
FROM usuario u
	LEFT JOIN projeto_feito pf
		ON pf.fk_usuario = u.id
	LEFT JOIN experimento_material em
		ON em.fk_experimento = pf.fk_experimento
GROUP BY u.id;

-- KPI: Tempo criando
CREATE VIEW vw_dash_tempo AS
SELECT
	u.id AS id_usuario,
	CASE
		WHEN SUM(e.tempo_min) IS NULL THEN 0
		ELSE SUM(e.tempo_min)
	END AS total_minutos,
	CASE
		WHEN SUM(e.tempo_min) IS NULL THEN '0h00'
		ELSE CONCAT(
			FLOOR(SUM(e.tempo_min) / 60), 'h',
			LPAD(MOD(SUM(e.tempo_min), 60), 2, '0')
		)
	END AS tempo_criando
FROM usuario u
	LEFT JOIN projeto_feito pf
		ON pf.fk_usuario = u.id
	LEFT JOIN experimento e
		ON e.id = pf.fk_experimento
GROUP BY u.id;

-- Rosca: "Que experimento você mais faz?" (por categoria)
-- O Foguete conta em Química e em Física, por isso a parte (%) é calculada
-- sobre o total de contagens por categoria, não sobre o total de projetos.
-- SELECT * FROM vw_dash_categorias WHERE id_usuario = ? ORDER BY projetos DESC;
CREATE VIEW vw_dash_categorias AS
SELECT
	pf.fk_usuario AS id_usuario,
	c.nome AS categoria,
	COUNT(*) AS projetos,
	ROUND(COUNT(*) * 100 / (
		SELECT COUNT(*)
		FROM projeto_feito pf2
			JOIN experimento_categoria ec2
				ON ec2.fk_experimento = pf2.fk_experimento
		WHERE pf2.fk_usuario = pf.fk_usuario
	)) AS parte_percentual
FROM projeto_feito pf
	JOIN experimento_categoria ec
		ON ec.fk_experimento = pf.fk_experimento
	JOIN categoria c
		ON c.id = ec.fk_categoria
GROUP BY pf.fk_usuario, c.id, c.nome;

-- Tabela "Suas últimas descobertas" e página Projetos feitos
-- SELECT * FROM vw_projetos_feitos WHERE id_usuario = ? ORDER BY realizado_em DESC LIMIT 4;
CREATE VIEW vw_projetos_feitos AS
SELECT
	pf.fk_usuario AS id_usuario,
	e.codigo,
	e.nome AS projeto,
	e.nivel,
	e.tempo_min,
	pf.dt_feito AS realizado_em
FROM projeto_feito pf
	JOIN experimento e
		ON e.id = pf.fk_experimento;

-- Comunidade: experimentos mais feitos nos últimos 7 dias
-- SELECT * FROM vw_comunidade_semana ORDER BY total DESC LIMIT 5;
CREATE VIEW vw_comunidade_semana AS
SELECT
	e.codigo,
	e.nome AS experimento,
	COUNT(*) AS total
FROM projeto_feito pf
	JOIN experimento e
		ON e.id = pf.fk_experimento
WHERE pf.dt_feito >= NOW() - INTERVAL 7 DAY
GROUP BY e.id, e.codigo, e.nome;

-- Comunidade: projetos feitos hoje
CREATE VIEW vw_comunidade_hoje AS
SELECT COUNT(*) AS feitos_hoje
FROM projeto_feito pf
WHERE DATE(pf.dt_feito) = CURDATE();

-- Experimentos com suas categorias (filtro TODOS / ENGENHARIA / FÍSICA / QUÍMICA)
-- SELECT * FROM vw_experimento_categoria WHERE categoria = ?;
CREATE VIEW vw_experimento_categoria AS
SELECT
	e.codigo,
	e.nome AS experimento,
	e.tempo_min,
	e.nivel,
	c.nome AS categoria
FROM experimento e
	JOIN experimento_categoria ec
		ON ec.fk_experimento = e.id
	JOIN categoria c
		ON c.id = ec.fk_categoria;

-- O que cada experimento precisa (página do projeto)
-- SELECT * FROM vw_experimento_material WHERE codigo_experimento = ?;
CREATE VIEW vw_experimento_material AS
SELECT
	e.codigo AS codigo_experimento,
	m.codigo AS codigo_material,
	m.nome AS material,
	em.qtd,
	m.unidade
FROM experimento_material em
	JOIN experimento e
		ON e.id = em.fk_experimento
	JOIN material m
		ON m.id = em.fk_material;

-- Meus materiais: estoque do usuário (passo = quanto os botões − e + mudam)
-- SELECT * FROM vw_estoque WHERE id_usuario = ? ORDER BY id_material;
CREATE VIEW vw_estoque AS
SELECT
	eu.fk_usuario AS id_usuario,
	m.id AS id_material,
	m.codigo,
	m.nome,
	m.tipo,
	m.detalhe,
	m.unidade,
	m.passo,
	eu.quantidade
FROM estoque_usuario eu
	JOIN material m
		ON m.id = eu.fk_material;

-- Experimentos que o usuário pode fazer com o estoque atual
-- (só entra o experimento em que nenhum material está abaixo da quantidade necessária)
CREATE VIEW vw_experimento_possivel AS
SELECT
	eu.fk_usuario AS id_usuario,
	e.codigo,
	e.nome AS experimento
FROM estoque_usuario eu
	JOIN experimento_material em
		ON em.fk_material = eu.fk_material
	JOIN experimento e
		ON e.id = em.fk_experimento
GROUP BY eu.fk_usuario, e.id, e.codigo, e.nome
HAVING SUM(CASE WHEN eu.quantidade < em.qtd THEN 1 ELSE 0 END) = 0;
