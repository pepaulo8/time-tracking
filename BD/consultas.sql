-- Consulta usuários
select * from users;

-- Consulta registros
select * from registers;

-- Consulta registros por profissinal
select name, time, date from users
inner join registers using (userID);

-- Consulta registros dos profissionais do mês atual
select name, time, date from users
inner join registers using (userID)
where MONTH(date) = MONTH(CURRENT_DATE());

-- Consulta registros dos profissionais por mês
select name, time, date from users
inner join registers using (userID)
where MONTH(date) = 10;

-- Consulta quem saiu mais tarde (depois das 17h)
select name, time, date from users
inner join registers using (userID)
where TIME(time) > '17:00:00';

-- Consulta quem entrou mais cedo (antes das 08h)
select name, time, date from users
inner join registers using (userID)
where TIME(time) < '08:00:00';

-- Consulta quantos registros cada usuário fez por dia
SELECT
    name,
    COUNT(*) AS qtd_registros,
    DATE(date) AS data_registro
FROM registers 
inner join users 
using (userID)
GROUP BY userID, DATE(date);

-- Consulta se algum usuário tem uma quantidade de registros impar (faltando registro de ponto)
SELECT
    name,
    COUNT(*) AS qtd_registros,
    DATE(date) AS data_registro
FROM registers 
inner join users 
using (userID)
GROUP BY userID, DATE(date)
HAVING qtd_registros % 2 <> 0;

-- Consulta quem saiu antes das 17h
WITH RankedRecords AS (
    SELECT
        name,
        date,
        time,
        ROW_NUMBER() OVER (PARTITION BY userID, DATE(date) ORDER BY date DESC, time DESC) AS RowNum
    FROM
        registers 
        INNER JOIN users USING (userId)
)

, LastRegisters AS (
    SELECT
        name,
        date,
        time
    FROM
        RankedRecords
    WHERE
        RowNum = 1
)

SELECT
    name,
    date,
    time
FROM
    LastRegisters
WHERE
    TIME(time) < '17:00:00';


