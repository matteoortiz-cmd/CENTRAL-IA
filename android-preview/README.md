# Central IA — prévia Android

Tela nativa de entrada do Central IA. O botão abre o site hospedado em uma janela do navegador, usando Custom Tabs quando disponíveis. A paleta usa azul, branco, preto e cinza.

Versão 0.2-preview, versionCode 2, Android 6 ou superior (minSdk 23). A URL de destino está em `smali/com/centrallab/centralia/MainActivity.smali`. O símbolo azul está em `unknown/res/drawable/app_icon.png`.

## Arquivos disponíveis

Este diretório preserva código smali, manifesto Android binário e recursos para reconstrução com Apktool. Não é o projeto original em Java/Kotlin com Gradle. Os APKs já assinados acompanham o pacote em `dist/downloads/`.

## Reconstruir

As ferramentas externas não acompanham o ZIP. Para repetir a compilação, use Java 21 e o [Apktool 3.0.3](https://github.com/iBotPeaches/Apktool/releases/tag/v3.0.3). Na pasta principal do projeto, execute, substituindo o caminho do JAR pelo arquivo que baixou:

```bash
java -jar CAMINHO_DO_APKTOOL.jar b android-preview -o android-preview/build/central-ia-unsigned.apk
```

Os recursos e o manifesto são preservados, sem necessidade de instalar o Android SDK para essa reconstrução. O APK resultante precisa ser alinhado e assinado antes de instalar. A prévia incluída foi alinhada, assinada e verificada com [uber-apk-signer 1.3.0](https://github.com/patrickfav/uber-apk-signer/releases/tag/v1.3.0), usando o certificado de desenvolvimento embutido nessa ferramenta.

Depois da assinatura, os dois arquivos de download do site devem ser atualizados se você quiser que ambos ofereçam o mesmo APK: `dist/downloads/central-ia-preview.apk` e `dist/downloads/central-ia-azul-0.2.apk`. Para uma versão nativa futura, prefira outro nome de download e ajuste o link em `dist/android.html`.

## Instalação e limites

A chave da primeira prévia roxa não está disponível. Ela tem outra assinatura: para trocar por esta prévia azul, é necessário desinstalar o aplicativo anterior. As assinaturas devem ser compatíveis para instalar atualizações sobre um aplicativo existente.

Não há chaves de assinatura privadas neste pacote. Mantenha qualquer chave própria fora do repositório. O certificado de desenvolvimento é para testes, não para distribuição de produção na Play Store.

A compilação, o alinhamento e a assinatura da prévia incluída foram verificados. Não houve teste físico de instalação pelo executor. O APK requer navegador e internet para abrir o site. Ele não carrega a versão do seu servidor local automaticamente.
