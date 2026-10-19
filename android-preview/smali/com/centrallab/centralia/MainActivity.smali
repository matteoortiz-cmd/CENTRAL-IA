.class public final Lcom/centrallab/centralia/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"


# static fields
.field private static final BLUE:I

.field private static final SITE:Ljava/lang/String; = "https://central-ia-lab.jazzy-corgi-7876.chatgpt.site"


# direct methods
.method static constructor <clinit>()V
    .locals 3

    .line 26
    const/16 v0, 0x54

    const/16 v1, 0xdb

    const/16 v2, 0x66

    const v0, -0xe2b128

    sput v0, Lcom/centrallab/centralia/MainActivity;->BLUE:I

    return-void
.end method

.method public constructor <init>()V
    .locals 0

    .line 24
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V

    return-void
.end method

.method static synthetic access$0()I
    .locals 1

    .line 26
    sget v0, Lcom/centrallab/centralia/MainActivity;->BLUE:I

    return v0
.end method

.method static synthetic access$1(Lcom/centrallab/centralia/MainActivity;F)I
    .locals 0

    .line 27
    invoke-direct {p0, p1}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result p0

    return p0
.end method

.method private background(II)Landroid/graphics/drawable/GradientDrawable;
    .locals 1

    .line 35
    new-instance v0, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v0}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    invoke-virtual {v0, p1}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    int-to-float p1, p2

    invoke-direct {p0, p1}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result p1

    int-to-float p1, p1

    invoke-virtual {v0, p1}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    return-object v0
.end method

.method private dp(F)I
    .locals 1

    .line 27
    invoke-virtual {p0}, Lcom/centrallab/centralia/MainActivity;->getResources()Landroid/content/res/Resources;

    move-result-object v0

    invoke-virtual {v0}, Landroid/content/res/Resources;->getDisplayMetrics()Landroid/util/DisplayMetrics;

    move-result-object v0

    iget v0, v0, Landroid/util/DisplayMetrics;->density:F

    mul-float/2addr p1, v0

    invoke-static {p1}, Ljava/lang/Math;->round(F)I

    move-result p1

    return p1
.end method

.method static synthetic lambda$0(Landroid/view/View;Landroid/view/WindowInsets;)Landroid/view/WindowInsets;
    .locals 3

    .line 43
    invoke-virtual {p1}, Landroid/view/WindowInsets;->getSystemWindowInsetTop()I

    move-result v0

    invoke-virtual {p1}, Landroid/view/WindowInsets;->getSystemWindowInsetBottom()I

    move-result v1

    const/4 v2, 0x0

    invoke-virtual {p0, v2, v0, v2, v1}, Landroid/view/View;->setPadding(IIII)V

    return-object p1
.end method

.method private openSite()V
    .locals 4

    .line 56
    new-instance v0, Landroid/content/Intent;

    const-string v1, "https://central-ia-lab.jazzy-corgi-7876.chatgpt.site"

    invoke-static {v1}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object v1

    const-string v2, "android.intent.action.VIEW"

    invoke-direct {v0, v2, v1}, Landroid/content/Intent;-><init>(Ljava/lang/String;Landroid/net/Uri;)V

    .line 57
    new-instance v1, Landroid/os/Bundle;

    invoke-direct {v1}, Landroid/os/Bundle;-><init>()V

    const-string v2, "android.support.customtabs.extra.SESSION"

    const/4 v3, 0x0

    invoke-virtual {v1, v2, v3}, Landroid/os/Bundle;->putBinder(Ljava/lang/String;Landroid/os/IBinder;)V

    invoke-virtual {v0, v1}, Landroid/content/Intent;->putExtras(Landroid/os/Bundle;)Landroid/content/Intent;

    .line 58
    const-string v1, "android.support.customtabs.extra.TOOLBAR_COLOR"

    sget v2, Lcom/centrallab/centralia/MainActivity;->BLUE:I

    invoke-virtual {v0, v1, v2}, Landroid/content/Intent;->putExtra(Ljava/lang/String;I)Landroid/content/Intent;

    .line 59
    const-string v1, "android.support.customtabs.extra.TITLE_VISIBILITY"

    const/4 v2, 0x1

    invoke-virtual {v0, v1, v2}, Landroid/content/Intent;->putExtra(Ljava/lang/String;I)Landroid/content/Intent;

    .line 60
    :try_start_0
    invoke-virtual {p0, v0}, Lcom/centrallab/centralia/MainActivity;->startActivity(Landroid/content/Intent;)V
    :try_end_0
    .catch Landroid/content/ActivityNotFoundException; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v0

    const-string v0, "Instale um navegador para abrir o Central IA."

    invoke-static {p0, v0, v2}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;

    move-result-object v0

    invoke-virtual {v0}, Landroid/widget/Toast;->show()V

    .line 61
    :goto_0
    return-void
.end method

.method private space(Landroid/widget/LinearLayout;I)V
    .locals 3

    .line 34
    new-instance v0, Landroid/view/View;

    invoke-direct {v0, p0}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    new-instance v1, Landroid/widget/LinearLayout$LayoutParams;

    int-to-float p2, p2

    invoke-direct {p0, p2}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result p2

    const/4 v2, 0x1

    invoke-direct {v1, v2, p2}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    invoke-virtual {p1, v0, v1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    return-void
.end method

.method private text(Ljava/lang/String;IIZ)Landroid/widget/TextView;
    .locals 1

    .line 29
    new-instance v0, Landroid/widget/TextView;

    invoke-direct {v0, p0}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 30
    invoke-virtual {v0, p1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    int-to-float p1, p2

    invoke-virtual {v0, p1}, Landroid/widget/TextView;->setTextSize(F)V

    invoke-virtual {v0, p3}, Landroid/widget/TextView;->setTextColor(I)V

    .line 31
    if-eqz p4, :cond_0

    const-string p1, "sans-serif"

    const/4 p2, 0x1

    invoke-static {p1, p2}, Landroid/graphics/Typeface;->create(Ljava/lang/String;I)Landroid/graphics/Typeface;

    move-result-object p1

    invoke-virtual {v0, p1}, Landroid/widget/TextView;->setTypeface(Landroid/graphics/Typeface;)V

    .line 32
    :cond_0
    const/high16 p1, 0x40400000    # 3.0f

    invoke-direct {p0, p1}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result p1

    int-to-float p1, p1

    const p2, 0x3f866666    # 1.05f

    invoke-virtual {v0, p1, p2}, Landroid/widget/TextView;->setLineSpacing(FF)V

    return-object v0
.end method


# virtual methods
.method synthetic lambda$1$com-centrallab-centralia-MainActivity(Landroid/view/View;)V
    .locals 0

    .line 50
    invoke-direct {p0}, Lcom/centrallab/centralia/MainActivity;->openSite()V

    return-void
.end method

.method synthetic lambda$2$com-centrallab-centralia-MainActivity(Landroid/view/View;)V
    .locals 2

    .line 52
    new-instance p1, Landroid/app/AlertDialog$Builder;

    invoke-direct {p1, p0}, Landroid/app/AlertDialog$Builder;-><init>(Landroid/content/Context;)V

    const-string v0, "Central IA \u2014 vers\u00e3o de teste"

    invoke-virtual {p1, v0}, Landroid/app/AlertDialog$Builder;->setTitle(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;

    move-result-object p1

    const-string v0, "Este APK \u00e9 um acesso ao Central IA em uma janela do navegador. Requer um navegador compat\u00edvel e conex\u00e3o para abrir o site.\n\nAs atualiza\u00e7\u00f5es do site aparecem sem reinstalar o APK. Seus projetos continuam salvos no navegador usado; n\u00e3o h\u00e1 sincroniza\u00e7\u00e3o em nuvem.\n\nN\u00e3o est\u00e1 publicado na Play Store. Dom\u00ednio pr\u00f3prio e identifica\u00e7\u00e3o de conta dentro do app ficam para uma pr\u00f3xima etapa."

    invoke-virtual {p1, v0}, Landroid/app/AlertDialog$Builder;->setMessage(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;

    move-result-object p1

    const-string v0, "Entendi"

    const/4 v1, 0x0

    invoke-virtual {p1, v0, v1}, Landroid/app/AlertDialog$Builder;->setPositiveButton(Ljava/lang/CharSequence;Landroid/content/DialogInterface$OnClickListener;)Landroid/app/AlertDialog$Builder;

    move-result-object p1

    invoke-virtual {p1}, Landroid/app/AlertDialog$Builder;->show()Landroid/app/AlertDialog;

    return-void
.end method

.method public onCreate(Landroid/os/Bundle;)V
    .locals 12

    .line 37
    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    .line 38
    invoke-virtual {p0}, Lcom/centrallab/centralia/MainActivity;->getWindow()Landroid/view/Window;

    move-result-object p1

    const/16 v0, 0xf7

    const/16 v1, 0xfb

    const v2, -0xa0a0b

    invoke-virtual {p1, v2}, Landroid/view/Window;->setStatusBarColor(I)V

    .line 39
    invoke-virtual {p0}, Lcom/centrallab/centralia/MainActivity;->getWindow()Landroid/view/Window;

    move-result-object p1

    const v2, -0xa0a0b

    invoke-virtual {p1, v2}, Landroid/view/Window;->setNavigationBarColor(I)V

    .line 40
    new-instance p1, Landroid/widget/ScrollView;

    invoke-direct {p1, p0}, Landroid/widget/ScrollView;-><init>(Landroid/content/Context;)V

    const/4 v2, 0x1

    invoke-virtual {p1, v2}, Landroid/widget/ScrollView;->setFillViewport(Z)V

    const v0, -0xa0a0b

    invoke-virtual {p1, v0}, Landroid/widget/ScrollView;->setBackgroundColor(I)V

    .line 41
    new-instance v0, Landroid/widget/LinearLayout;

    invoke-direct {v0, p0}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->setOrientation(I)V

    const/high16 v1, 0x41d00000    # 26.0f

    invoke-direct {p0, v1}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result v3

    invoke-direct {p0, v1}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result v4

    invoke-direct {p0, v1}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result v1

    const/high16 v5, 0x41b00000    # 22.0f

    invoke-direct {p0, v5}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result v5

    invoke-virtual {v0, v3, v4, v1, v5}, Landroid/widget/LinearLayout;->setPadding(IIII)V

    .line 42
    new-instance v1, Landroid/widget/FrameLayout$LayoutParams;

    const/4 v3, -0x2

    const/4 v4, -0x1

    invoke-direct {v1, v4, v3}, Landroid/widget/FrameLayout$LayoutParams;-><init>(II)V

    invoke-virtual {p1, v0, v1}, Landroid/widget/ScrollView;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    invoke-virtual {p0, p1}, Lcom/centrallab/centralia/MainActivity;->setContentView(Landroid/view/View;)V

    .line 43
    new-instance v1, Lcom/centrallab/centralia/MainActivity$$ExternalSyntheticLambda0;

    invoke-direct {v1}, Lcom/centrallab/centralia/MainActivity$$ExternalSyntheticLambda0;-><init>()V

    invoke-virtual {p1, v1}, Landroid/widget/ScrollView;->setOnApplyWindowInsetsListener(Landroid/view/View$OnApplyWindowInsetsListener;)V

    .line 44
    const/16 p1, 0x1c

    sget v1, Lcom/centrallab/centralia/MainActivity;->BLUE:I

    const-string v3, "\u2733  centralia"

    invoke-direct {p0, v3, p1, v1, v2}, Lcom/centrallab/centralia/MainActivity;->text(Ljava/lang/String;IIZ)Landroid/widget/TextView;

    move-result-object p1

    invoke-virtual {v0, p1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    const/16 p1, 0x20

    invoke-direct {p0, v0, p1}, Lcom/centrallab/centralia/MainActivity;->space(Landroid/widget/LinearLayout;I)V

    .line 45
    const/16 p1, 0xa

    sget v1, Lcom/centrallab/centralia/MainActivity;->BLUE:I

    const-string v3, "SEU ESPA\u00c7O DE CRIA\u00c7\u00c3O"

    invoke-direct {p0, v3, p1, v1, v2}, Lcom/centrallab/centralia/MainActivity;->text(Ljava/lang/String;IIZ)Landroid/widget/TextView;

    move-result-object p1

    const v1, 0x3e19999a    # 0.15f

    invoke-virtual {p1, v1}, Landroid/widget/TextView;->setLetterSpacing(F)V

    invoke-virtual {v0, p1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    const/16 p1, 0xe

    invoke-direct {p0, v0, p1}, Lcom/centrallab/centralia/MainActivity;->space(Landroid/widget/LinearLayout;I)V

    .line 46
    const/16 p1, 0x24

    const/16 v1, 0x39

    const/16 v3, 0x22

    const p1, -0xe8e8e9

    const-string v1, "Sua pr\u00f3xima ideia\ncome\u00e7a aqui."

    invoke-direct {p0, v1, v3, p1, v2}, Lcom/centrallab/centralia/MainActivity;->text(Ljava/lang/String;IIZ)Landroid/widget/TextView;

    move-result-object p1

    invoke-virtual {v0, p1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    const/16 p1, 0x10

    invoke-direct {p0, v0, p1}, Lcom/centrallab/centralia/MainActivity;->space(Landroid/widget/LinearLayout;I)V

    .line 47
    const-string p1, "Aprenda a usar suas IAs favoritas e experimente seus projetos em um s\u00f3 lugar."

    const/16 v1, 0x73

    const/16 v3, 0x70

    const/16 v5, 0x87

    const v6, -0x99999a

    const/16 v7, 0xf

    const/4 v8, 0x0

    invoke-direct {p0, p1, v7, v6, v8}, Lcom/centrallab/centralia/MainActivity;->text(Ljava/lang/String;IIZ)Landroid/widget/TextView;

    move-result-object p1

    invoke-virtual {v0, p1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    const/16 p1, 0x1a

    invoke-direct {p0, v0, p1}, Lcom/centrallab/centralia/MainActivity;->space(Landroid/widget/LinearLayout;I)V

    .line 48
    new-instance v6, Lcom/centrallab/centralia/MainActivity$1;

    invoke-direct {v6, p0, p0}, Lcom/centrallab/centralia/MainActivity$1;-><init>(Lcom/centrallab/centralia/MainActivity;Landroid/content/Context;)V

    .line 49
    const-string v9, "Ilustra\u00e7\u00e3o de uma p\u00e1gina no laborat\u00f3rio Central IA"

    invoke-virtual {v6, v9}, Landroid/view/View;->setContentDescription(Ljava/lang/CharSequence;)V

    new-instance v9, Landroid/widget/LinearLayout$LayoutParams;

    const/high16 v10, 0x43520000    # 210.0f

    invoke-direct {p0, v10}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result v10

    invoke-direct {v9, v4, v10}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    invoke-virtual {v0, v6, v9}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    const/16 v6, 0x18

    invoke-direct {p0, v0, v6}, Lcom/centrallab/centralia/MainActivity;->space(Landroid/widget/LinearLayout;I)V

    .line 50
    new-instance v6, Landroid/widget/Button;

    invoke-direct {v6, p0}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    const-string v9, "Abrir Central IA  \u2197"

    invoke-virtual {v6, v9}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    invoke-virtual {v6, v8}, Landroid/widget/Button;->setAllCaps(Z)V

    const/high16 v9, 0x41700000    # 15.0f

    invoke-virtual {v6, v9}, Landroid/widget/Button;->setTextSize(F)V

    invoke-virtual {v6, v4}, Landroid/widget/Button;->setTextColor(I)V

    sget v9, Lcom/centrallab/centralia/MainActivity;->BLUE:I

    const/16 v10, 0xc

    invoke-direct {p0, v9, v10}, Lcom/centrallab/centralia/MainActivity;->background(II)Landroid/graphics/drawable/GradientDrawable;

    move-result-object v9

    invoke-virtual {v6, v9}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    new-instance v9, Landroid/widget/LinearLayout$LayoutParams;

    const/high16 v11, 0x42600000    # 56.0f

    invoke-direct {p0, v11}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result v11

    invoke-direct {v9, v4, v11}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    invoke-virtual {v0, v6, v9}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    new-instance v4, Lcom/centrallab/centralia/MainActivity$$ExternalSyntheticLambda1;

    invoke-direct {v4, p0}, Lcom/centrallab/centralia/MainActivity$$ExternalSyntheticLambda1;-><init>(Lcom/centrallab/centralia/MainActivity;)V

    invoke-virtual {v6, v4}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    invoke-direct {p0, v0, v7}, Lcom/centrallab/centralia/MainActivity;->space(Landroid/widget/LinearLayout;I)V

    .line 51
    const-string v4, "Instru\u00e7\u00f5es de IA \u2022 Tutoriais \u2022 Laborat\u00f3rio de sites"

    const v6, -0x99999a

    invoke-direct {p0, v4, v10, v6, v8}, Lcom/centrallab/centralia/MainActivity;->text(Ljava/lang/String;IIZ)Landroid/widget/TextView;

    move-result-object v4

    const/16 v6, 0x11

    invoke-virtual {v4, v6}, Landroid/widget/TextView;->setGravity(I)V

    invoke-virtual {v0, v4}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    invoke-direct {p0, v0, p1}, Lcom/centrallab/centralia/MainActivity;->space(Landroid/widget/LinearLayout;I)V

    .line 52
    const/16 p1, 0xd

    sget v4, Lcom/centrallab/centralia/MainActivity;->BLUE:I

    const-string v7, "Sobre esta vers\u00e3o de teste"

    invoke-direct {p0, v7, p1, v4, v2}, Lcom/centrallab/centralia/MainActivity;->text(Ljava/lang/String;IIZ)Landroid/widget/TextView;

    move-result-object p1

    invoke-virtual {p1, v6}, Landroid/widget/TextView;->setGravity(I)V

    const/high16 v2, 0x41200000    # 10.0f

    invoke-direct {p0, v2}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result v4

    invoke-direct {p0, v2}, Lcom/centrallab/centralia/MainActivity;->dp(F)I

    move-result v2

    invoke-virtual {p1, v8, v4, v8, v2}, Landroid/widget/TextView;->setPadding(IIII)V

    new-instance v2, Lcom/centrallab/centralia/MainActivity$$ExternalSyntheticLambda2;

    invoke-direct {v2, p0}, Lcom/centrallab/centralia/MainActivity$$ExternalSyntheticLambda2;-><init>(Lcom/centrallab/centralia/MainActivity;)V

    invoke-virtual {p1, v2}, Landroid/widget/TextView;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    invoke-virtual {v0, p1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    const/16 p1, 0x14

    invoke-direct {p0, v0, p1}, Lcom/centrallab/centralia/MainActivity;->space(Landroid/widget/LinearLayout;I)V

    .line 53
    const/16 p1, 0xb

    const v1, -0x99999a

    const-string v2, "Central Lab \u2022 Matteo da Silva"

    invoke-direct {p0, v2, p1, v1, v8}, Lcom/centrallab/centralia/MainActivity;->text(Ljava/lang/String;IIZ)Landroid/widget/TextView;

    move-result-object p1

    invoke-virtual {p1, v6}, Landroid/widget/TextView;->setGravity(I)V

    invoke-virtual {v0, p1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 54
    return-void
.end method
