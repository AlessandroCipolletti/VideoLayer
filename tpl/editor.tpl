<div class="editor__container" style="height: calc(100% - {{marginTop}}px); top: {{marginTop}}px;">

  <div class="editor__preview-container">
    <div class="editor__preview"></div>
    <div class="editor__preview-gotofullscreen">+</div>
  </div>

  <div class="editor__controls-container">

    <div class="editor__controls-time-container">
      <div class="editor__controls-add"></div>
      <span class="editor__controls-from-label">{{fromLabel}}</span>
      <input class="editor__controls-from-minutes" type="number" max="59" min="0" maxlength="2" size="2"/> :
      <input class="editor__controls-from-secondes" type="number" max="59" min="0" maxlength="2" size="2"/> :
      <input class="editor__controls-from-millisecondes" type="number" max="99" min="0" maxlength="2" size="2"/>
      <span class="editor__controls-to-label">{{toLabel}}</span>
      <input class="editor__controls-to-minutes" type="number" max="59" min="0" maxlength="2" size="2"/> :
      <input class="editor__controls-to-secondes" type="number" max="59" min="0" maxlength="2" size="2"/> :
      <input class="editor__controls-to-millisecondes" type="number" max="99" min="0" maxlength="2" size="2"/>
    </div>

    <div class="editor__controls-sliders-container">

      <div class="editor__controls-slider editor__controls-slider-video" id="sliderVideo1">
        <div class="editor__controls-slider-crop-left">
          <div class="editor__controls-slider-crop-grabber"></div>
        </div>
        <div class="editor__controls-slider-crop-right">
          <div class="editor__controls-slider-crop-grabber"></div>
        </div>
      </div>

      <div class="editor__controls-slider editor__controls-slider-video" id="sliderVideo2">
        <div class="editor__controls-slider-crop-left">
          <div class="editor__controls-slider-crop-grabber"></div>
        </div>
        <div class="editor__controls-slider-crop-right">
          <div class="editor__controls-slider-crop-grabber"></div>
        </div>
      </div>

      <div class="editor__controls-slider editor__controls-slider-video" id="sliderVideo3">

      </div>

    </div>

  </div>

</div>
