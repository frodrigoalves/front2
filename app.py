import streamlit as st
import os
import streamlit.components.v1 as components

# Configuração inicial da página
st.set_page_config(page_title="SingulAI - Plataforma Inteligente", layout="wide")

# Verificação de arquivos essenciais
required_files = ["index.html", "style.css", "ai.png", "blockchain.png", "connectivity.png", "video3.mp4"]

missing_files = [file for file in required_files if not os.path.exists(file)]

if missing_files:
    st.error(f"Erro: Os seguintes arquivos estão ausentes: {', '.join(missing_files)}")
    st.stop()

# Carregar HTML
def load_html():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

# Renderizar HTML no Streamlit
components.html(load_html(), height=900, scrolling=True)

# 🔥 Aplicar o CSS diretamente no Streamlit
try:
    with open("style.css", "r", encoding="utf-8") as css_file:
        css_styles = f"<style>{css_file.read()}</style>"
        st.markdown(css_styles, unsafe_allow_html=True)
except Exception as e:
    st.error(f"Erro ao carregar CSS: {e}")

# Exibir tecnologias usadas
st.write("## 🌍 Tecnologias Usadas")
col1, col2, col3 = st.columns(3)
col1.image("ai.png", caption="Inteligência Artificial", width=180)
col2.image("blockchain.png", caption="Blockchain", width=180)
col3.image("connectivity.png", caption="Conectividade Global", width=180)

# Exibir vídeo corretamente
video_path = "video3.mp4"
if os.path.exists(video_path):
    st.video(video_path)
else:
    st.warning("⚠️ O vídeo não foi encontrado. Verifique o arquivo.")

# Rodapé
st.markdown(
    """
    <div style='text-align: center; margin-top: 50px;'>
        <p style='font-size: 14px; color: #777;'>SingulAI © 2025 - Legado Digital Eterno</p>
    </div>
    """,
    unsafe_allow_html=True
)
