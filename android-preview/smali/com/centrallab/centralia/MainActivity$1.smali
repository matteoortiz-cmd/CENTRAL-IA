.class Lcom/centrallab/centralia/MainActivity$1;
.super Landroid/view/View;
.source "MainActivity.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/centrallab/centralia/MainActivity;->onCreate(Landroid/os/Bundle;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final p:Landroid/graphics/Paint;

.field final synthetic this$0:Lcom/centrallab/centralia/MainActivity;


# direct methods
.method constructor <init>(Lcom/centrallab/centralia/MainActivity;Landroid/content/Context;)V
    .locals 0

    .line 48
    iput-object p1, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    invoke-direct {p0, p2}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    new-instance p1, Landroid/graphics/Paint;

    const/4 p2, 0x3

    invoke-direct {p1, p2}, Landroid/graphics/Paint;-><init>(I)V

    iput-object p1, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    return-void
.end method


# virtual methods
.method protected onDraw(Landroid/graphics/Canvas;)V
    .locals 12

    .line 48
    invoke-super {p0, p1}, Landroid/view/View;->onDraw(Landroid/graphics/Canvas;)V

    invoke-virtual {p0}, Lcom/centrallab/centralia/MainActivity$1;->getWidth()I

    move-result v0

    int-to-float v0, v0

    invoke-virtual {p0}, Lcom/centrallab/centralia/MainActivity$1;->getHeight()I

    move-result v1

    int-to-float v1, v1

    iget-object v2, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    invoke-static {}, Lcom/centrallab/centralia/MainActivity;->access$0()I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/graphics/Paint;->setColor(I)V

    new-instance v2, Landroid/graphics/RectF;

    const/4 v3, 0x0

    invoke-direct {v2, v3, v3, v0, v1}, Landroid/graphics/RectF;-><init>(FFFF)V

    iget-object v3, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    const/high16 v4, 0x41b00000    # 22.0f

    invoke-static {v3, v4}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v3

    int-to-float v3, v3

    iget-object v5, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    invoke-static {v5, v4}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v4

    int-to-float v4, v4

    iget-object v5, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    invoke-virtual {p1, v2, v3, v4, v5}, Landroid/graphics/Canvas;->drawRoundRect(Landroid/graphics/RectF;FFLandroid/graphics/Paint;)V

    iget-object v2, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    const/4 v3, -0x1

    invoke-virtual {v2, v3}, Landroid/graphics/Paint;->setColor(I)V

    new-instance v2, Landroid/graphics/RectF;

    const v3, 0x3df5c28f    # 0.12f

    mul-float v5, v0, v3

    const v3, 0x3e2e147b    # 0.17f

    mul-float/2addr v3, v1

    const v4, 0x3f6147ae    # 0.88f

    mul-float v7, v0, v4

    const v4, 0x3f59999a    # 0.85f

    mul-float/2addr v4, v1

    invoke-direct {v2, v5, v3, v7, v4}, Landroid/graphics/RectF;-><init>(FFFF)V

    iget-object v3, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    const/high16 v10, 0x41400000    # 12.0f

    invoke-static {v3, v10}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v3

    int-to-float v3, v3

    iget-object v4, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    invoke-static {v4, v10}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v4

    int-to-float v4, v4

    iget-object v6, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    invoke-virtual {p1, v2, v3, v4, v6}, Landroid/graphics/Canvas;->drawRoundRect(Landroid/graphics/RectF;FFLandroid/graphics/Paint;)V

    iget-object v2, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    const/16 v3, 0xee

    const/16 v4, 0xea

    const/16 v11, 0xff

    const v3, -0xa0a0b

    invoke-virtual {v2, v3}, Landroid/graphics/Paint;->setColor(I)V

    const v2, 0x3e8a3d71    # 0.27f

    mul-float v6, v1, v2

    const v2, 0x3e947ae1    # 0.29f

    mul-float v8, v1, v2

    iget-object v9, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    move-object v4, p1

    invoke-virtual/range {v4 .. v9}, Landroid/graphics/Canvas;->drawRect(FFFFLandroid/graphics/Paint;)V

    iget-object v2, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    invoke-static {}, Lcom/centrallab/centralia/MainActivity;->access$0()I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/graphics/Paint;->setColor(I)V

    const/4 v2, 0x0

    :goto_0
    const/4 v3, 0x3

    if-lt v2, v3, :cond_0

    iget-object v2, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    iget-object v3, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    const/high16 v4, 0x41980000    # 19.0f

    invoke-static {v3, v4}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v3

    int-to-float v3, v3

    invoke-virtual {v2, v3}, Landroid/graphics/Paint;->setTextSize(F)V

    iget-object v2, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    const-string v3, "sans-serif"

    const/4 v4, 0x1

    invoke-static {v3, v4}, Landroid/graphics/Typeface;->create(Ljava/lang/String;I)Landroid/graphics/Typeface;

    move-result-object v3

    invoke-virtual {v2, v3}, Landroid/graphics/Paint;->setTypeface(Landroid/graphics/Typeface;)Landroid/graphics/Typeface;

    const v2, 0x3e4ccccd    # 0.2f

    mul-float/2addr v2, v0

    const v3, 0x3ef5c28f    # 0.48f

    mul-float/2addr v3, v1

    iget-object v4, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    const-string v5, "Uma ideia."

    invoke-virtual {p1, v5, v2, v3, v4}, Landroid/graphics/Canvas;->drawText(Ljava/lang/String;FFLandroid/graphics/Paint;)V

    const v3, 0x3f1eb852    # 0.62f

    mul-float/2addr v3, v1

    iget-object v4, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    const-string v5, "Muitas possibilidades."

    invoke-virtual {p1, v5, v2, v3, v4}, Landroid/graphics/Canvas;->drawText(Ljava/lang/String;FFLandroid/graphics/Paint;)V

    iget-object v3, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    const/16 v4, 0xe9

    const/16 v5, 0xe4

    const v4, -0x241502

    invoke-virtual {v3, v4}, Landroid/graphics/Paint;->setColor(I)V

    new-instance v3, Landroid/graphics/RectF;

    const v4, 0x3f333333    # 0.7f

    mul-float/2addr v4, v1

    const v5, 0x3efae148    # 0.49f

    mul-float/2addr v0, v5

    const v5, 0x3f428f5c    # 0.76f

    mul-float/2addr v1, v5

    invoke-direct {v3, v2, v4, v0, v1}, Landroid/graphics/RectF;-><init>(FFFF)V

    iget-object v0, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    const/high16 v1, 0x40800000    # 4.0f

    invoke-static {v0, v1}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v0

    int-to-float v0, v0

    iget-object v2, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    invoke-static {v2, v1}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v1

    int-to-float v1, v1

    iget-object v2, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    invoke-virtual {p1, v3, v0, v1, v2}, Landroid/graphics/Canvas;->drawRoundRect(Landroid/graphics/RectF;FFLandroid/graphics/Paint;)V

    return-void

    :cond_0
    const v3, 0x3e428f5c    # 0.19f

    mul-float/2addr v3, v0

    iget-object v4, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    invoke-static {v4, v10}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v4

    mul-int/2addr v4, v2

    int-to-float v4, v4

    add-float/2addr v3, v4

    const v4, 0x3e6b851f    # 0.23f

    mul-float/2addr v4, v1

    iget-object v5, p0, Lcom/centrallab/centralia/MainActivity$1;->this$0:Lcom/centrallab/centralia/MainActivity;

    const v6, 0x402ccccd    # 2.7f

    invoke-static {v5, v6}, Lcom/centrallab/centralia/MainActivity;->access$1(Lcom/centrallab/centralia/MainActivity;F)I

    move-result v5

    int-to-float v5, v5

    iget-object v6, p0, Lcom/centrallab/centralia/MainActivity$1;->p:Landroid/graphics/Paint;

    invoke-virtual {p1, v3, v4, v5, v6}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    add-int/lit8 v2, v2, 0x1

    goto/16 :goto_0
.end method
