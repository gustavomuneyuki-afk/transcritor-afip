# Transcritor AFIP

Aplicação web para extração e transcrição automática de resultados de exames laboratoriais a partir de laudos em PDF da AFIP.

O objetivo é transformar os resultados encontrados no laudo em uma linha compacta e padronizada, facilitando sua transferência para o prontuário.

Exemplo:

```text
Hb 16,5 / Ht 47,3% / Leuco 6.030 (N 3.500 / Linf 1.610) / Plaq 220.000 | Gli 99 / HbA1c 5,7% | Cr 1,12 (TFG 72) | CT 153 / HDL 47 / LDL 93 / VLDL 13 / TGL 64 | ...
```

## Privacidade

O processamento do PDF é realizado **localmente no navegador**.

O Transcritor AFIP:

- não envia o PDF para um servidor para realizar a extração;
- não utiliza IA para interpretar o laudo;
- não infere resultados ausentes;
- não realiza diagnóstico;
- não sugere condutas médicas.

O aplicativo apenas identifica e reorganiza informações presentes no próprio documento.

## Exames suportados

### Hemograma

- Hemoglobina
- Hematócrito
- Leucócitos
- Neutrófilos absolutos
- Linfócitos absolutos
- Plaquetas
- Reticulócitos absolutos e relativos

### Metabolismo glicêmico

- Glicemia
- Hemoglobina glicada (HbA1c)

### Função renal

- Ureia
- Creatinina
- Taxa de filtração glomerular estimada (TFG)

### Perfil lipídico

- Colesterol total
- HDL
- LDL
- VLDL
- Triglicérides

### Eletrólitos e metabolismo

- Ácido úrico
- Sódio
- Potássio
- Fósforo
- Magnésio
- Cálcio ionizado

### Hepatograma

- TGO / AST
- TGP / ALT
- GGT
- Fosfatase alcalina
- Bilirrubina total
- Bilirrubina direta
- Bilirrubina indireta
- Albumina
- Proteínas totais

### Marcadores inflamatórios

- PCR
- Procalcitonina
- VHS
- Ferritina

### Hormônios

- TSH
- T4 livre
- ACTH
- Cortisol
- PTH

### Vitaminas e metabolismo

- Ferro
- Transferrina
- Saturação da transferrina
- Vitamina B12
- Ácido fólico
- 25-OH vitamina D
- Zinco

### Marcadores cardíacos e musculares

- CPK
- CK-MB
- Troponina
- proBNP

### Coagulação

- Tempo de protrombina (TP)
- INR
- TTPa
- Fibrinogênio
- D-dímero

### Marcadores tumorais

- Alfafetoproteína (AFP)
- PSA total
- PSA livre
- Relação PSA livre/total

### Exames urinários

**Urina I**

Leucócitos e hemácias são transcritos quando presentes no laudo. Os demais parâmetros são incluídos na saída quando identificados como alterados de acordo com as regras implementadas para o formato da AFIP.

Entre os campos suportados estão:

- Densidade
- pH
- Proteína
- Glicose
- Bilirrubina
- Cetona
- Sangue
- Nitrito
- Urobilinogênio
- Células epiteliais
- Leucócitos
- Hemácias
- Cristais
- Cilindros
- Bactérias

**Proteinúria e albuminúria**

- Proteína urinária
- Creatinina urinária
- Albumina urinária
- Relação proteína/creatinina
- Relação albumina/creatinina

Alguns campos estão preparados no parser, mas dependem de validação adicional com laudos reais da AFIP.

## Funcionamento

O processamento segue, de forma geral, o fluxo:

```text
PDF
 ↓
Extração local do texto
 ↓
Definitions
 ↓
Parsers
 ↓
Dados estruturados
 ↓
Formatters
 ↓
Transcrição compacta
```

Exames com estrutura regular utilizam um parser genérico.

Quando o formato do laudo apresenta ambiguidades ou campos dependentes de uma seção específica, são utilizados parsers especializados.

## Modo desenvolvedor

O aplicativo possui um modo desenvolvedor que permite visualizar individualmente os campos encontrados ou não encontrados no PDF.

Esse recurso auxilia na:

- validação de novos exames;
- identificação de alterações no layout dos laudos;
- investigação de falsos positivos;
- investigação de falsos negativos;
- validação de novos parsers.

## Tecnologias

- React
- TypeScript
- Vite
- PDF.js

## Executando localmente

Clone o repositório:

```bash
git clone https://github.com/gustavomuneyuki-afk/transcritor-afip.git
```

Entre na pasta:

```bash
cd transcritor-afip
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Para gerar o build de produção:

```bash
npm run build
```

## Estrutura

A arquitetura principal utiliza a separação:

```text
definitions → parser → formatter
```

Os tipos dos exames permanecem centralizados em:

```text
src/types/exams.ts
```

Os principais diretórios são:

```text
src/
├── components/
├── definitions/
├── formatter/
├── parser/
├── types/
└── utils/
```

## Limitações

O parser foi desenvolvido e validado utilizando layouts reais de laudos da AFIP.

Alterações futuras no formato dos PDFs, títulos dos exames, unidades ou disposição das informações podem exigir atualização das regras de extração.

A ausência de um resultado na transcrição não deve ser interpretada como ausência do exame no documento sem conferência do laudo original.

A aplicação não substitui a conferência do documento laboratorial original.

## Desenvolvimento

Novos exames devem, sempre que possível, ser implementados após análise de um laudo real da AFIP contendo o exame.

O objetivo é evitar regras baseadas em formatos presumidos e reduzir falsos positivos durante a extração.

Fluxo habitual:

```text
PDF real
 ↓
Análise do layout
 ↓
Implementação
 ↓
Build
 ↓
Validação
 ↓
Teste de regressão
```

## Versão

**v1.0.0**

Primeira versão estável após validação e testes de regressão com diferentes laudos reais da AFIP.