// Age
let getAge = function (config) {
  let age = {
    type: jsPsychSurveyText,
    data: {
      trialName: 'age',
      studyID: config.studyID,
      componentID: config.componentID,
      batchID: config.batchID,
      workerID: config.workerID,
    },
    questions: [
      {
        prompt: 'How old are you?',
        columns: 3,
        required: true,
        name: 'Age',
        button_label: 'Continue',
      },
    ],
    on_load: function () {
      resize_off()
      let inputBox = document.getElementById('input-0')
      inputBox.setAttribute('type', 'number')
      inputBox.setAttribute('required', '')
      inputBox.style.width = '3ch'
      inputBox.addEventListener('input', function () {
        if (inputBox.value.length > 2) {
          inputBox.value = inputBox.value.substring(0, 2)
        }
      })
    },
    css_classes: ['textbutton'],
  }
  return age
}

let getGender = function (config) {
  let gender = {
    type: jsPsychSurveyMultiChoice,
    data: {
      trialName: 'gender',
      studyID: config.studyID,
      componentID: config.componentID,
      batchID: config.batchID,
      workerID: config.workerID,
    },
    questions: [
      {
        prompt: 'Gender',
        name: 'Gender',
        options: ['male', 'female', 'other'],
        required: true,
      },
    ],
    on_load: function () {
      resize_off()
    },
    css_classes: ['textbutton'],
  }
  return gender
}

let getScreenCalibration = function (config) {
  let screenCalibration = {
    type: jsPsychResize,
    item_width: 3 + 3 / 8,
    item_height: 2 + 1 / 8,
    prompt:
      '<p style="font-size: 30px;">Screen Calibration:</p> <p style="font-size: 24px;"><br>Click and drag the lower right corner of the box until the box is the same size as a credit card held up to the screen.</p>',
    pixels_per_unit: 642 / 6,
    data: {
      trialName: 'screenCalibration',
      studyID: config.studyID,
      componentID: config.componentID,
      batchID: config.batchID,
      workerID: config.workerID,
    },
    on_finish: function (data) {
      scale_factor = data.scale_factor
    },
  }
  return screenCalibration
}

let getBrowserCheck = function (config) {
  let browserCheck = {
    type: jsPsychBrowserCheck,
    data: {
      trialName: 'browserCheck',
      studyID: config.studyID,
      componentID: config.componentID,
      batchID: config.batchID,
      workerID: config.workerID,
    },
  }
  return browserCheck
}

// Resize
function resize_off() {
  scale_factor = 1
  document.getElementById('jspsych-content').style.transform =
    'scale(' + scale_factor + ')'
}

function resize_on(scale_factor) {
  document.getElementById('jspsych-content').style.transform =
    'scale(' + scale_factor + ')'
}
