
////////////////////////////
// Complete trial objects //
////////////////////////////

dotmaskTrial = function (
  focus_obj,
  fixation_obj,
  item_obj,
  mask_obj,
  data_obj,
) {
  let trial = {
    type: jsPsychPsychophysics,
    stimuli: [focus_obj, fixation_obj, ...item_obj, mask_obj], // These can be referenced using the jsPsych.currentTrial().stimuli array.
    data: data_obj, // data to store about the trial
    maxlength: config.maxAnswerLength, // maximum number of characters in the input box, max 999 dots
    input_hover: config.input_hover, // If true, the input box will be drawn on top of the mask. If false, it will be drawn below the mask.
    response_type: config.responseType,
    button_choices: config.responseChoices,
    prompt: config.buttonPrompt,
    response_prompt: config.responsePrompt,
    canvas_width: config.canvasWidth,
    canvas_height: config.canvasHeight,
    background_color: config.canvasBackgroundColor,
    input_show_time: config.inputStart, // when to show the input box
    response_start_time: config.responseStart, // when participant can start responding
    choices: 'NO_KEYS',
    css_classes: ['experimenttrial'],
    trialName: 'dotmaskTrial',
    save_trial_parameters: {
      trialName: true,
      rt: true, // Reaction time, input_show_time - submit_time
      response: true,
      answer: true,
      on_start_time: true, // time that the trial started (on_start)
      on_load_time: true, // time that the trial finished loading (on_load)
      submit_time: true, // time that the trial was submitted
    },
    on_start: function (trial) {
      // Runs before any variables are initialized
      // Record time that the trial started (on_start)
      jsPsych.getCurrentTrial().on_start_time = Math.round(performance.now())
    },
    on_load: function () {
      // Create trial structure with 3 divs: prompt, canvas, and response
      let prompt_div = document.createElement('div')
      prompt_div.id = 'prompt_div'
      prompt_div.innerHTML = this.response_prompt // HTML is allowed in the prompt.
      let canvas_div = document.createElement('div')
      canvas_div.id = 'canvas_div'
      let canvas = document.getElementById('myCanvas')
      canvas_div.appendChild(canvas)
      let response_div = document.createElement('div')
      response_div.id = 'response_div'

      if (this.input_hover == true) response_div.style.position = 'absolute' // If the input box is in front of the mask, it needs to be positioned absolutely

      // Add inputbox to the response div
      let response_form = document.createElement('form')

      // On submit, store the response and end the trial
      //response_form.addEventListener('submit',function(){submitAnswer()})
      console.log("1.time shold be here: "+currentTrial.input_show_time)
      response_form.onsubmit = function (e) {
        e.preventDefault()
        inputValue = document.getElementById('answertext').value

        currentTrial = jsPsych.getCurrentTrial()
        currentTrial.submit_time = Math.round(performance.now())
        console.log("2.time shold be here: "+currentTrial.input_show_time)
        currentTrial.rt = currentTrial.submit_time - currentTrial.on_load_time - currentTrial.input_show_time // trial_length - input_show_time
        currentTrial.answer = inputValue
        
        currentTrial.response = {
          answer: inputValue,
          submit_time: Math.round(performance.now()),
          trial_length: Math.round(performance.now() - currentTrial.on_load_time),
        }
        
        currentTrial.end_trial() // Cleans up the screen and event listeners and calls jsPsych.finishTrial()
      }

      let inputanswer = document.createElement('input')
      inputanswer.id = 'answertext'
      inputanswer.type = 'number'
      inputanswer.style.visibility = 'hidden'
      inputanswer.disabled = 'true'
      inputanswer.setAttribute('required', '')

      inputanswer.autocomplete = 'off'
      inputanswer.min = 0
      inputanswer.style.width = this.maxlength + 'ch'
      inputanswer.addEventListener('input', function () {
        if (inputanswer.value.length > config.maxAnswerLength) {
          inputanswer.value = inputanswer.value.substring(
            0,
            config.maxAnswerLength,
          )
        }
      })

      inputanswer.style.color = '#ffffff'
      if (config.inputbox_cursor == false) {
        inputanswer.style.color = 'transparent'
        inputanswer.style.textShadow = '0 0 0 #fff'
      }
      response_form.appendChild(inputanswer)
      response_div.appendChild(response_form)

      // Add the divs to the main jspsych div
      let trial_div = document.getElementById('jspsych-content') //main jspsych div
      trial_div.appendChild(prompt_div)
      trial_div.appendChild(canvas_div)
      trial_div.appendChild(response_div)

      centerInputbox() // Center inputbox on the canvas

      // Timing for when to show the input box
      let addconst = 0
      if (this.input_hover == true) {
        addconst = 16 // add constant to be sure that textbox does not appear before mask is drawn ?
      }
      let delaytime = this.input_show_time + addconst
      if (config.isFrame == true) {
        delaytime = this.input_show_time * config.recordedframelength + addconst
      }

      setTimeout(function () {
        inputanswer.style.visibility = 'visible'
        inputanswer.focus()
      }, delaytime)

      setTimeout(function () {
        inputanswer.disabled = false
        inputanswer.focus()
      }, this.response_start_time)

      // Add event listener in case participant resizes window
      window.onresize = centerInputbox

      // Add event listener to give back control to input box if participant takes a break
      window.onmousemove = function () {
        let inputanswer = document.getElementById('answertext')
        inputanswer.focus()
      }

      window.onclick = function () {
        let inputanswer = document.getElementById('answertext')
        inputanswer.focus()
      }

      // Record  time that trial finished loading.
      jsPsych.getCurrentTrial().on_load_time = Math.round(performance.now())

      // Function to center the input box on the canvas
      function centerInputbox() {
        response_div.style.top =
          canvas.offsetTop +
          canvas.offsetHeight / 2 -
          inputanswer.offsetHeight / 2 +
          `px`
        response_div.style.left =
          canvas.offsetLeft +
          canvas.offsetWidth / 2 -
          inputanswer.offsetWidth / 2 +
          `px`
      }
    },
    on_finish: function (data) {
      // Clean up
      window.onclick = null
      window.onmousemove = null
      window.onresize = null
    },
  }

  return trial
}
