import streamlit as st
import pandas as pd
import plotly.express as px

# ✅ Streamlit deve ser configurado primeiro
st.set_page_config(page_title="SingulAI - Servidor de Interações", layout="wide")

# 🚀 Título principal do Dashboard
st.title("📊 Monitoramento do SingulAI")
st.write("## 💡 Dados de Uso da Plataforma")

# 📂 Carregar dados (simulação de dados do SingulAI)
csv_path = "dados_singulai.csv"

try:
    df = pd.read_csv(csv_path)
except FileNotFoundError:
    st.error("❌ Arquivo de dados não encontrado. Verifique se 'dados_singulai.csv' está no diretório correto.")
    st.stop()

# 📌 Mostrar Tabela de Dados
st.dataframe(df)

# 📊 Estatísticas Gerais
col1, col2 = st.columns(2)
col1.metric("📌 Total de Usuários Registrados", len(df))

# 🔥 Tecnologias Mais Utilizadas
st.write("### 🔥 Tecnologias Mais Utilizadas")
fig_tecnologias = px.bar(df, x="Tecnologia", title="Uso por Tecnologia", color="Tecnologia")
st.plotly_chart(fig_tecnologias, use_container_width=True)

# 🌍 Distribuição de Usuários por Região
st.write("### 🌎 Distribuição de Usuários por Região")
fig_regioes = px.pie(df, names="Região", title="Regiões com Mais Usuários", hole=0.4)
st.plotly_chart(fig_regioes, use_container_width=True)

# 💻 Plataformas Mais Usadas
st.write("### 💻 Plataformas Mais Utilizadas")
fig_plataformas = px.bar(df, x="Plataforma", title="Plataformas Preferidas", color="Plataforma")
st.plotly_chart(fig_plataformas, use_container_width=True)

# ⏳ Tempo Médio de Atividade na Plataforma
st.write("### ⏳ Média de Tempo de Atividade")
fig_tempo = px.histogram(df, x="Tempo_Atividade", title="Distribuição do Tempo de Atividade", nbins=10)
st.plotly_chart(fig_tempo, use_container_width=True)

# 🤖 Interação com IA
st.write("### 🤖 Interação com IA")
fig_interacoes = px.line(df, x=df.index, y="Interação_AI", title="Evolução das Interações com IA")
st.plotly_chart(fig_interacoes, use_container_width=True)

# 🛡️ Conexão com Blockchain
st.write("## 🔗 Blockchain e Registro de Mensagens")
st.write("📌 **Total de Mensagens na Blockchain:** 1,250")
st.write("🔐 **Contratos Inteligentes Ativos:** 5")

# 📅 Atividades Recentes
st.write("## 🏆 Últimas Atividades dos Usuários")
st.table(df.tail(5))

# 🔗 Redirecionamento para a Landing Page (Opcional)
st.markdown("[🌍 Acessar Landing Page](landing.html)", unsafe_allow_html=True)

# 📍 Rodapé
st.markdown(
    "<p style='text-align: center;'>SingulAI - Monitoramento Inteligente 🚀</p>",
    unsafe_allow_html=True
)
