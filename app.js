const STORAGE_KEYS = {
  lang: "gmt-rally-lang",
  profile: "gmt-rally-profile",
  draft: "gmt-rally-draft",
  creatorName: "gmt-rally-creator-name",
  emailProvider: "gmt-rally-email-provider"
};

const I18N = {
  zh: {
    creatorNameLabel: "建立者名字 / ID",
    creatorNamePlaceholder: "例如 Nicole 或 team-sync",
    creatorNameNote: "這個名字會用來查詢你建立過的投票，請當成私密 ID。",
    creatorNameRequired: "請輸入建立者名字",
    creatorLookupTitle: "查詢我建立的投票",
    creatorLookupHint: "輸入建立時使用的名字，可以看到公開投票連結和建立者修改連結。",
    creatorLookupLabel: "建立者名字 / ID",
    creatorLookupPlaceholder: "輸入同一個建立者名字",
    lookupCreatorPolls: "查詢",
    creatorLookupEmpty: "找不到這個名字建立的投票",
    creatorLookupReady: ({ count }) => `找到 ${count} 個投票`,
    creatorLookupFailed: "目前無法查詢，請確認後端已部署完成",
    creatorPollLinkLabel: "會議投票連結",
    creatorManageLinkLabel: "創建者修改連結",
    deletePoll: "刪除",
    deletePollConfirm: ({ title }) => `確定要永久刪除「${title}」嗎？所有投票回應也會一起刪除。`,
    deletePollDone: "已刪除會議投票",
    deletePollFailed: "刪除失敗，請確認你有創建者修改連結",
    pollDeleted: "這個會議投票已被建立者刪除",
    createdAtLabel: "建立時間",
    updatedAtLabel: "更新時間",
    responsesShort: ({ count }) => `${count} 份回應`,
    brandSubtitle: "會議時間投票",
    createEyebrow: "Create poll",
    createTitle: "建立會議投票",
    loadDemo: "範例",
    detailsTitle: "會議內容",
    topicLabel: "會議主題",
    topicPlaceholder: "例如：跨區產品週會",
    agendaLabel: "大綱內容",
    agendaPlaceholder: "討論內容、決策項目、準備事項",
    linkLabel: "會議連結",
    linkPlaceholder: "https://meet.example.com/team",
    timeComposerTitle: "候選會議時間",
    changeTimezone: "變更時區",
    dateLabel: "日期",
    startTimeLabel: "開始時間",
    durationLabel: "長度",
    addTime: "加入",
    createPoll: "產生投票連結",
    resetForm: "清空",
    shareLinkLabel: "投票連結",
    manageLinkLabel: "建立者管理連結",
    manageLinkWarning: "只有建立者使用，請勿分享給參與者。",
    copyLink: "複製",
    copyManageLink: "複製",
    openPoll: "開啟投票頁",
    candidateTitle: "已選時間",
    noSlots: "尚未加入候選時間",
    newPoll: "建立新投票",
    showResults: "結果",
    participantTitle: "你的回覆",
    nameLabel: "姓名",
    namePlaceholder: "你的名字",
    submitVote: "送出投票",
    backToVote: "回到投票",
    copyPollLink: "複製投票連結",
    resultsTitle: "投票結果",
    timezoneEyebrow: "Local time",
    timezoneTitle: "請先選擇你的國家",
    close: "關閉",
    countrySearchLabel: "搜尋國家",
    countrySearchPlaceholder: "輸入國家名稱，例如 Taiwan、Japan、台灣",
    detected: "目前瀏覽器時區",
    noTimezoneResults: "找不到符合的國家",
    creatorTimezone: ({ country, zone, gmt }) => `建立者時區：${country} · ${zone} · ${gmt}`,
    selectedTimezone: ({ country, gmt }) => `${gmt} · ${country}`,
    slotDuration: ({ minutes }) => `${minutes} 分鐘`,
    removeSlot: "移除時間",
    canAttend: "可以",
    cannotAttend: "無法",
    meetingLink: "會議連結",
    creatorLabel: "建立者",
    localLabel: "你的當地時間",
    votesLabel: ({ count }) => `${count} 份回覆`,
    yesCount: ({ count }) => `${count} 可以`,
    noCount: ({ count }) => `${count} 無法`,
    availablePeople: "可以參加",
    unavailablePeople: "無法參加",
    timeColumn: "時間",
    bestTimes: "最佳時間",
    noVotes: "尚無投票",
    copied: "已複製",
    copyFailed: "無法自動複製，請手動選取連結",
    titleRequired: "請輸入會議主題",
    slotRequired: "請至少加入一個候選時間",
    dateTimeRequired: "請選擇日期與開始時間",
    duplicateSlot: "這個時間已經在清單中",
    pollReady: "投票連結已產生",
    voteIncomplete: "請為每個時間選擇可以或無法",
    nameRequired: "請輸入姓名",
    voteSaved: "投票已儲存",
    voteLocked: "你已送出回覆，這份投票不能再更改；可以直接查看結果",
    voteAlreadySubmitted: "這個姓名已經送出過回覆，不能覆蓋原本選擇",
    submittedVote: "已送出",
    creatorToolsTitle: "建立者設定",
    creatorOnly: "建立者專用",
    saveMeetingDetails: "儲存變更",
    detailsSaved: "會議資訊已更新",
    manageDenied: "只有建立者管理連結可以更新會議資訊",
    invalidPoll: "投票連結無法讀取",
    syncFailed: "無法連線到同步伺服器，請確認後端服務正在執行",
    syncFallback: "同步伺服器未連線，已產生離線投票連結",
    demoLoaded: "範例已載入",
    formReset: "已清空",
    untitledAgenda: "未填寫大綱",
    untitledLink: "未提供連結"
  },
  en: {
    creatorNameLabel: "Creator name / ID",
    creatorNamePlaceholder: "Example: Nicole or team-sync",
    creatorNameNote: "This name lets you look up polls you created. Treat it like a private ID.",
    creatorNameRequired: "Add a creator name",
    creatorLookupTitle: "Find my created polls",
    creatorLookupHint: "Enter the same creator name to see the voting links and creator management links.",
    creatorLookupLabel: "Creator name / ID",
    creatorLookupPlaceholder: "Enter the same creator name",
    lookupCreatorPolls: "Find polls",
    creatorLookupEmpty: "No polls were found for that creator name",
    creatorLookupReady: ({ count }) => `${count} polls found`,
    creatorLookupFailed: "Cannot look up polls right now. Check that the backend is deployed.",
    creatorPollLinkLabel: "Voting link",
    creatorManageLinkLabel: "Creator edit link",
    deletePoll: "Delete",
    deletePollConfirm: ({ title }) => `Permanently delete "${title}"? All responses will be deleted too.`,
    deletePollDone: "Poll deleted",
    deletePollFailed: "Could not delete this poll. Check that you have the creator edit link.",
    pollDeleted: "This poll was deleted by the creator",
    createdAtLabel: "Created",
    updatedAtLabel: "Updated",
    responsesShort: ({ count }) => `${count} responses`,
    brandSubtitle: "meeting time polls",
    createEyebrow: "Create poll",
    createTitle: "Create a meeting poll",
    loadDemo: "Sample",
    detailsTitle: "Meeting details",
    topicLabel: "Meeting topic",
    topicPlaceholder: "Example: Cross-region product sync",
    agendaLabel: "Agenda",
    agendaPlaceholder: "Discussion points, decisions, preparation notes",
    linkLabel: "Meeting link",
    linkPlaceholder: "https://meet.example.com/team",
    timeComposerTitle: "Candidate meeting times",
    changeTimezone: "Change time zone",
    dateLabel: "Date",
    startTimeLabel: "Start time",
    endTimeLabel: "End time",
    durationLabel: "Length",
    intervalLabel: "Interval",
    addTime: "Add",
    bulkRangeTitle: "Bulk add time range",
    rangePresetFullDay: "Full day",
    rangePresetWorkHours: "Work hours",
    rangePresetCustom: "Custom",
    addRange: "Add time range",
    createPoll: "Create voting link",
    resetForm: "Clear",
    shareLinkLabel: "Voting link",
    manageLinkLabel: "Creator management link",
    manageLinkWarning: "For the creator only. Do not share it with participants.",
    copyLink: "Copy",
    copyManageLink: "Copy",
    openPoll: "Open poll",
    candidateTitle: "Selected times",
    noSlots: "No candidate times yet",
    newPoll: "New poll",
    showResults: "Results",
    participantTitle: "Your response",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email required",
    emailPlaceholder: "name@example.com",
    submitVote: "Submit vote",
    backToVote: "Back to vote",
    copyPollLink: "Copy poll link",
    resultsTitle: "Results",
    timezoneEyebrow: "Local time",
    timezoneTitle: "Choose your country first",
    close: "Close",
    countrySearchLabel: "Search country",
    countrySearchPlaceholder: "Type a country, for example Taiwan, Japan, United States",
    detected: "Detected browser time zone",
    noTimezoneResults: "No matching country",
    creatorTimezone: ({ country, zone, gmt }) => `Creator time zone: ${country} · ${zone} · ${gmt}`,
    selectedTimezone: ({ country, gmt }) => `${gmt} · ${country}`,
    slotDuration: ({ minutes }) => `${minutes} min`,
    removeSlot: "Remove time",
    canAttend: "Can attend",
    cannotAttend: "Cannot attend",
    meetingLink: "Meeting link",
    creatorLabel: "Creator",
    localLabel: "Your local time",
    votesLabel: ({ count }) => `${count} responses`,
    yesCount: ({ count }) => `${count} can`,
    noCount: ({ count }) => `${count} cannot`,
    availablePeople: "Can attend",
    unavailablePeople: "Cannot attend",
    timeColumn: "Time",
    bestTimes: "Best times",
    noVotes: "No votes yet",
    copied: "Copied",
    copyFailed: "Could not copy automatically. Select the link manually.",
    titleRequired: "Add a meeting topic",
    slotRequired: "Add at least one candidate time",
    dateTimeRequired: "Choose a date and start time",
    rangeTimeRequired: "Choose a date, start time, end time, and interval",
    rangeEndAfterStart: "End time must be after start time",
    rangeNoSlots: "No time slots fit inside that range",
    duplicateSlot: "That time is already on the list",
    rangeAdded: ({ count }) => `Added ${count} time slots`,
    pollReady: "Voting link created",
    voteIncomplete: "Choose can or cannot for every time",
    nameRequired: "Add your name",
    emailRequired: "Add a valid email address",
    voteSaved: "Vote saved",
    voteLocked: "Your response has been submitted and can no longer be changed. You can view results directly.",
    voteAlreadySubmitted: "This name has already submitted a response and cannot overwrite the original choices.",
    submittedVote: "Submitted",
    creatorToolsTitle: "Creator settings",
    creatorOnly: "Creator only",
    saveMeetingDetails: "Save changes",
    detailsSaved: "Meeting details updated",
    finalSlotLabel: "Final meeting time",
    confirmMeeting: "Confirm meeting time",
    finalMeetingSaved: "Final meeting time confirmed. You can now email every attendee who provided an email address.",
    finalMeeting: "Final meeting",
    emailAttendees: "Open email draft",
    emailDraftReady: ({ provider }) => `${provider} draft opened with attendee emails in Bcc.`,
    emailProviderLabel: "Email app",
    emailProviderGmail: "Gmail",
    emailProviderOutlook: "Outlook web",
    emailProviderDefault: "Default mail app",
    sendCalendarInvite: "Send calendar invite",
    sendingCalendarInvite: "Sending calendar invite...",
    calendarInviteSent: "Calendar invite sent",
    calendarEmailSent: ({ count }) => `Sent calendar invite to ${count} attendees`,
    calendarEmailAlreadySent: "Calendar invites were already sent for this final meeting time",
    calendarEmailFailed: "Could not send calendar invite email",
    downloadCalendarInvite: "Download calendar file",
    copyAttendeeEmails: "Copy attendee emails",
    attendeeEmailsLabel: "Attendee emails",
    attendeeEmailsPlaceholder: "Emails will appear after participants vote",
    attendeeEmailsCopied: ({ count }) => `Copied ${count} attendee emails`,
    noAttendeeEmails: "No attendee emails are available yet",
    calendarInvite: "Calendar invite",
    manageDenied: "Only the creator management link can update meeting details",
    invalidPoll: "This poll link cannot be read",
    syncFailed: "Cannot connect to the sync server. Make sure the backend is running.",
    syncFallback: "Sync server is offline. An offline voting link was created.",
    demoLoaded: "Sample loaded",
    formReset: "Cleared",
    untitledAgenda: "No agenda",
    untitledLink: "No link"
  }
};

const COUNTRY_ZONES = [
  ["AF", "Asia/Kabul"],
  ["AX", "Europe/Mariehamn"],
  ["AL", "Europe/Tirane"],
  ["DZ", "Africa/Algiers"],
  ["AS", "Pacific/Pago_Pago"],
  ["AD", "Europe/Andorra"],
  ["AO", "Africa/Luanda"],
  ["AI", "America/Anguilla"],
  ["AQ", "Antarctica/Casey|Antarctica/Davis|Antarctica/DumontDUrville|Antarctica/Mawson|Antarctica/McMurdo|Antarctica/Palmer|Antarctica/Rothera|Antarctica/Syowa|Antarctica/Troll|Antarctica/Vostok"],
  ["AG", "America/Antigua"],
  ["AR", "America/Argentina/Buenos_Aires|America/Argentina/Catamarca|America/Argentina/Cordoba|America/Argentina/Jujuy|America/Argentina/La_Rioja|America/Argentina/Mendoza|America/Argentina/Rio_Gallegos|America/Argentina/Salta|America/Argentina/San_Juan|America/Argentina/San_Luis|America/Argentina/Tucuman|America/Argentina/Ushuaia"],
  ["AM", "Asia/Yerevan"],
  ["AW", "America/Aruba"],
  ["AU", "Australia/Adelaide|Australia/Brisbane|Australia/Broken_Hill|Australia/Darwin|Australia/Eucla|Australia/Hobart|Australia/Lindeman|Australia/Lord_Howe|Australia/Melbourne|Australia/Perth|Australia/Sydney"],
  ["AT", "Europe/Vienna"],
  ["AZ", "Asia/Baku"],
  ["BS", "America/Nassau"],
  ["BH", "Asia/Bahrain"],
  ["BD", "Asia/Dhaka"],
  ["BB", "America/Barbados"],
  ["BY", "Europe/Minsk"],
  ["BE", "Europe/Brussels"],
  ["BZ", "America/Belize"],
  ["BJ", "Africa/Porto-Novo"],
  ["BM", "Atlantic/Bermuda"],
  ["BT", "Asia/Thimphu"],
  ["BO", "America/La_Paz"],
  ["BQ", "America/Kralendijk"],
  ["BA", "Europe/Sarajevo"],
  ["BW", "Africa/Gaborone"],
  ["BR", "America/Araguaina|America/Bahia|America/Belem|America/Boa_Vista|America/Campo_Grande|America/Cuiaba|America/Eirunepe|America/Fortaleza|America/Maceio|America/Manaus|America/Noronha|America/Porto_Velho|America/Recife|America/Rio_Branco|America/Santarem|America/Sao_Paulo"],
  ["IO", "Indian/Chagos"],
  ["VG", "America/Tortola"],
  ["BN", "Asia/Brunei"],
  ["BG", "Europe/Sofia"],
  ["BF", "Africa/Ouagadougou"],
  ["BI", "Africa/Bujumbura"],
  ["CV", "Atlantic/Cape_Verde"],
  ["KH", "Asia/Phnom_Penh"],
  ["CM", "Africa/Douala"],
  ["CA", "America/Atikokan|America/Cambridge_Bay|America/Creston|America/Dawson|America/Edmonton|America/Fort_Nelson|America/Glace_Bay|America/Goose_Bay|America/Halifax|America/Inuvik|America/Iqaluit|America/Moncton|America/Rankin_Inlet|America/Regina|America/Resolute|America/St_Johns|America/Swift_Current|America/Toronto|America/Vancouver|America/Whitehorse|America/Winnipeg|America/Yellowknife"],
  ["KY", "America/Cayman"],
  ["CF", "Africa/Bangui"],
  ["TD", "Africa/Ndjamena"],
  ["CL", "America/Punta_Arenas|America/Santiago|Pacific/Easter"],
  ["CN", "Asia/Shanghai|Asia/Urumqi"],
  ["CX", "Indian/Christmas"],
  ["CC", "Indian/Cocos"],
  ["CO", "America/Bogota"],
  ["KM", "Indian/Comoro"],
  ["CG", "Africa/Brazzaville"],
  ["CD", "Africa/Kinshasa|Africa/Lubumbashi"],
  ["CK", "Pacific/Rarotonga"],
  ["CR", "America/Costa_Rica"],
  ["CI", "Africa/Abidjan"],
  ["HR", "Europe/Zagreb"],
  ["CU", "America/Havana"],
  ["CW", "America/Curacao"],
  ["CY", "Asia/Famagusta|Asia/Nicosia"],
  ["CZ", "Europe/Prague"],
  ["DK", "Europe/Copenhagen"],
  ["DJ", "Africa/Djibouti"],
  ["DM", "America/Dominica"],
  ["DO", "America/Santo_Domingo"],
  ["EC", "America/Guayaquil|Pacific/Galapagos"],
  ["EG", "Africa/Cairo"],
  ["SV", "America/El_Salvador"],
  ["GQ", "Africa/Malabo"],
  ["ER", "Africa/Asmara"],
  ["EE", "Europe/Tallinn"],
  ["SZ", "Africa/Mbabane"],
  ["ET", "Africa/Addis_Ababa"],
  ["FK", "Atlantic/Stanley"],
  ["FO", "Atlantic/Faroe"],
  ["FJ", "Pacific/Fiji"],
  ["FI", "Europe/Helsinki"],
  ["FR", "Europe/Paris"],
  ["GF", "America/Cayenne"],
  ["PF", "Pacific/Gambier|Pacific/Marquesas|Pacific/Tahiti"],
  ["TF", "Indian/Kerguelen"],
  ["GA", "Africa/Libreville"],
  ["GM", "Africa/Banjul"],
  ["GE", "Asia/Tbilisi"],
  ["DE", "Europe/Berlin|Europe/Busingen"],
  ["GH", "Africa/Accra"],
  ["GI", "Europe/Gibraltar"],
  ["GR", "Europe/Athens"],
  ["GL", "America/Danmarkshavn|America/Nuuk|America/Scoresbysund|America/Thule"],
  ["GD", "America/Grenada"],
  ["GP", "America/Guadeloupe"],
  ["GU", "Pacific/Guam"],
  ["GT", "America/Guatemala"],
  ["GG", "Europe/Guernsey"],
  ["GN", "Africa/Conakry"],
  ["GW", "Africa/Bissau"],
  ["GY", "America/Guyana"],
  ["HT", "America/Port-au-Prince"],
  ["VA", "Europe/Vatican"],
  ["HN", "America/Tegucigalpa"],
  ["HK", "Asia/Hong_Kong"],
  ["HU", "Europe/Budapest"],
  ["IS", "Atlantic/Reykjavik"],
  ["IN", "Asia/Kolkata"],
  ["ID", "Asia/Jakarta|Asia/Jayapura|Asia/Makassar|Asia/Pontianak"],
  ["IR", "Asia/Tehran"],
  ["IQ", "Asia/Baghdad"],
  ["IE", "Europe/Dublin"],
  ["IM", "Europe/Isle_of_Man"],
  ["IL", "Asia/Jerusalem"],
  ["IT", "Europe/Rome"],
  ["JM", "America/Jamaica"],
  ["JP", "Asia/Tokyo"],
  ["JE", "Europe/Jersey"],
  ["JO", "Asia/Amman"],
  ["KZ", "Asia/Almaty|Asia/Aqtau|Asia/Aqtobe|Asia/Atyrau|Asia/Oral|Asia/Qostanay|Asia/Qyzylorda"],
  ["KE", "Africa/Nairobi"],
  ["KI", "Pacific/Enderbury|Pacific/Kiritimati|Pacific/Tarawa"],
  ["KP", "Asia/Pyongyang"],
  ["KR", "Asia/Seoul"],
  ["XK", "Europe/Belgrade"],
  ["KW", "Asia/Kuwait"],
  ["KG", "Asia/Bishkek"],
  ["LA", "Asia/Vientiane"],
  ["LV", "Europe/Riga"],
  ["LB", "Asia/Beirut"],
  ["LS", "Africa/Maseru"],
  ["LR", "Africa/Monrovia"],
  ["LY", "Africa/Tripoli"],
  ["LI", "Europe/Vaduz"],
  ["LT", "Europe/Vilnius"],
  ["LU", "Europe/Luxembourg"],
  ["MO", "Asia/Macau"],
  ["MG", "Indian/Antananarivo"],
  ["MW", "Africa/Blantyre"],
  ["MY", "Asia/Kuala_Lumpur|Asia/Kuching"],
  ["MV", "Indian/Maldives"],
  ["ML", "Africa/Bamako"],
  ["MT", "Europe/Malta"],
  ["MH", "Pacific/Kwajalein|Pacific/Majuro"],
  ["MQ", "America/Martinique"],
  ["MR", "Africa/Nouakchott"],
  ["MU", "Indian/Mauritius"],
  ["YT", "Indian/Mayotte"],
  ["MX", "America/Bahia_Banderas|America/Cancun|America/Chihuahua|America/Hermosillo|America/Matamoros|America/Mazatlan|America/Merida|America/Mexico_City|America/Monterrey|America/Ojinaga|America/Tijuana"],
  ["FM", "Pacific/Chuuk|Pacific/Kosrae|Pacific/Pohnpei"],
  ["MD", "Europe/Chisinau"],
  ["MC", "Europe/Monaco"],
  ["MN", "Asia/Choibalsan|Asia/Hovd|Asia/Ulaanbaatar"],
  ["ME", "Europe/Podgorica"],
  ["MS", "America/Montserrat"],
  ["MA", "Africa/Casablanca"],
  ["MZ", "Africa/Maputo"],
  ["MM", "Asia/Yangon"],
  ["NA", "Africa/Windhoek"],
  ["NR", "Pacific/Nauru"],
  ["NP", "Asia/Kathmandu"],
  ["NL", "Europe/Amsterdam"],
  ["NC", "Pacific/Noumea"],
  ["NZ", "Pacific/Auckland|Pacific/Chatham"],
  ["NI", "America/Managua"],
  ["NE", "Africa/Niamey"],
  ["NG", "Africa/Lagos"],
  ["NU", "Pacific/Niue"],
  ["NF", "Pacific/Norfolk"],
  ["MK", "Europe/Skopje"],
  ["MP", "Pacific/Saipan"],
  ["NO", "Europe/Oslo"],
  ["OM", "Asia/Muscat"],
  ["PK", "Asia/Karachi"],
  ["PW", "Pacific/Palau"],
  ["PS", "Asia/Gaza|Asia/Hebron"],
  ["PA", "America/Panama"],
  ["PG", "Pacific/Bougainville|Pacific/Port_Moresby"],
  ["PY", "America/Asuncion"],
  ["PE", "America/Lima"],
  ["PH", "Asia/Manila"],
  ["PN", "Pacific/Pitcairn"],
  ["PL", "Europe/Warsaw"],
  ["PT", "Atlantic/Azores|Atlantic/Madeira|Europe/Lisbon"],
  ["PR", "America/Puerto_Rico"],
  ["QA", "Asia/Qatar"],
  ["RE", "Indian/Reunion"],
  ["RO", "Europe/Bucharest"],
  ["RU", "Asia/Anadyr|Asia/Barnaul|Asia/Chita|Asia/Irkutsk|Asia/Kamchatka|Asia/Khandyga|Asia/Krasnoyarsk|Asia/Magadan|Asia/Novokuznetsk|Asia/Novosibirsk|Asia/Omsk|Asia/Sakhalin|Asia/Srednekolymsk|Asia/Tomsk|Asia/Ust-Nera|Asia/Vladivostok|Asia/Yakutsk|Asia/Yekaterinburg|Europe/Astrakhan|Europe/Kaliningrad|Europe/Kirov|Europe/Moscow|Europe/Samara|Europe/Saratov|Europe/Ulyanovsk|Europe/Volgograd"],
  ["RW", "Africa/Kigali"],
  ["BL", "America/St_Barthelemy"],
  ["SH", "Atlantic/St_Helena"],
  ["KN", "America/St_Kitts"],
  ["LC", "America/St_Lucia"],
  ["MF", "America/Marigot"],
  ["PM", "America/Miquelon"],
  ["VC", "America/St_Vincent"],
  ["WS", "Pacific/Apia"],
  ["SM", "Europe/San_Marino"],
  ["ST", "Africa/Sao_Tome"],
  ["SA", "Asia/Riyadh"],
  ["SN", "Africa/Dakar"],
  ["RS", "Europe/Belgrade"],
  ["SC", "Indian/Mahe"],
  ["SL", "Africa/Freetown"],
  ["SG", "Asia/Singapore"],
  ["SX", "America/Lower_Princes"],
  ["SK", "Europe/Bratislava"],
  ["SI", "Europe/Ljubljana"],
  ["SB", "Pacific/Guadalcanal"],
  ["SO", "Africa/Mogadishu"],
  ["ZA", "Africa/Johannesburg"],
  ["GS", "Atlantic/South_Georgia"],
  ["SS", "Africa/Juba"],
  ["ES", "Africa/Ceuta|Atlantic/Canary|Europe/Madrid"],
  ["LK", "Asia/Colombo"],
  ["SD", "Africa/Khartoum"],
  ["SR", "America/Paramaribo"],
  ["SJ", "Europe/Oslo"],
  ["SE", "Europe/Stockholm"],
  ["CH", "Europe/Zurich"],
  ["SY", "Asia/Damascus"],
  ["TW", "Asia/Taipei"],
  ["TJ", "Asia/Dushanbe"],
  ["TZ", "Africa/Dar_es_Salaam"],
  ["TH", "Asia/Bangkok"],
  ["TL", "Asia/Dili"],
  ["TG", "Africa/Lome"],
  ["TK", "Pacific/Fakaofo"],
  ["TO", "Pacific/Tongatapu"],
  ["TT", "America/Port_of_Spain"],
  ["TN", "Africa/Tunis"],
  ["TR", "Europe/Istanbul"],
  ["TM", "Asia/Ashgabat"],
  ["TC", "America/Grand_Turk"],
  ["TV", "Pacific/Funafuti"],
  ["UG", "Africa/Kampala"],
  ["UA", "Europe/Kyiv|Europe/Simferopol"],
  ["AE", "Asia/Dubai"],
  ["GB", "Europe/London"],
  ["US", "America/Adak|America/Anchorage|America/Boise|America/Chicago|America/Denver|America/Detroit|America/Indiana/Indianapolis|America/Indiana/Knox|America/Indiana/Marengo|America/Indiana/Petersburg|America/Indiana/Tell_City|America/Indiana/Vevay|America/Indiana/Vincennes|America/Indiana/Winamac|America/Juneau|America/Kentucky/Louisville|America/Kentucky/Monticello|America/Los_Angeles|America/Menominee|America/Metlakatla|America/New_York|America/Nome|America/North_Dakota/Beulah|America/North_Dakota/Center|America/North_Dakota/New_Salem|America/Phoenix|America/Sitka|America/Yakutat|Pacific/Honolulu"],
  ["UM", "Pacific/Midway|Pacific/Wake"],
  ["VI", "America/St_Thomas"],
  ["UY", "America/Montevideo"],
  ["UZ", "Asia/Samarkand|Asia/Tashkent"],
  ["VU", "Pacific/Efate"],
  ["VE", "America/Caracas"],
  ["VN", "Asia/Ho_Chi_Minh"],
  ["WF", "Pacific/Wallis"],
  ["EH", "Africa/El_Aaiun"],
  ["YE", "Asia/Aden"],
  ["ZM", "Africa/Lusaka"],
  ["ZW", "Africa/Harare"]
];

const REGION_FALLBACKS = {
  XK: { zh: "科索沃", en: "Kosovo" }
};

const ZONE_FALLBACKS = {
  "Europe/Kyiv": "Europe/Kiev",
  "America/Nuuk": "America/Godthab",
  "Asia/Yangon": "Asia/Rangoon",
  "Pacific/Pohnpei": "Pacific/Ponape",
  "Asia/Ho_Chi_Minh": "Asia/Saigon"
};

const state = {
  lang: "en",
  profile: null,
  countryOptions: [],
  detectedTimeZone: "UTC",
  slots: [],
  poll: null,
  pollEncoded: "",
  adminToken: "",
  shareUrl: "",
  shareAdminUrl: "",
  creatorPolls: null,
  creatorLookupSearched: false,
  rangePreset: "workHours",
  choices: {},
  votes: [],
  voteLocked: false,
  serverBacked: false,
  realtimeSource: null,
  timezoneRequired: false
};

const els = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheElements();
  els.emailProviderSelect.value = getStoredEmailProvider();
  state.detectedTimeZone = getDetectedTimeZone();
  state.countryOptions = buildCountryOptions();
  state.lang = loadLanguage();
  localStorage.setItem(STORAGE_KEYS.lang, "en");
  state.profile = loadProfile();
  state.slots = loadDraftSlots();
  populateRangeTimeOptions();
  bindEvents();
  applyI18n();
  await routeFromHash();
  setDefaultSlotInputs();
  renderAll();
  if (!state.profile) {
    openTimezoneGate(true);
  }
}

function cacheElements() {
  const ids = [
    "profileButton",
    "profileLabel",
    "creatorTimezoneLabel",
    "participantTimezoneLabel",
    "resultsTimezoneLabel",
    "composerTimezoneText",
    "changeCreatorTimezoneButton",
    "changeParticipantTimezoneButton",
    "timezoneGate",
    "timezoneSearch",
    "timezoneResults",
    "closeTimezoneButton",
    "meetingTitle",
    "creatorName",
    "meetingAgenda",
    "meetingUrl",
    "slotDate",
    "slotTime",
    "slotDuration",
    "addSlotButton",
    "rangeDate",
    "rangeStartTime",
    "rangeEndTime",
    "rangeInterval",
    "addRangeButton",
    "slotList",
    "slotCount",
    "createPollButton",
    "resetFormButton",
    "createMessage",
    "shareBox",
    "shareLink",
    "manageLinkField",
    "manageLink",
    "copyLinkButton",
    "copyManageLinkButton",
    "creatorLookupName",
    "lookupCreatorPollsButton",
    "creatorLookupMessage",
    "creatorPollList",
    "openPollButton",
    "loadDemoButton",
    "createView",
    "voteView",
    "resultsView",
    "newPollButton",
    "showResultsButton",
    "backToVoteButton",
    "copyPollLinkButton",
    "pollMeta",
    "resultsMeta",
    "participantName",
    "participantEmail",
    "voteSlots",
    "voteMessage",
    "submitVoteButton",
    "creatorTools",
    "editMeetingTitle",
    "editMeetingAgenda",
    "editMeetingUrl",
    "savePollDetailsButton",
    "finalSlotSelect",
    "confirmMeetingButton",
    "sendCalendarInviteButton",
    "emailProviderSelect",
    "emailAttendeesLink",
    "calendarInviteLink",
    "copyAttendeeEmailsButton",
    "attendeeEmailList",
    "detailsMessage",
    "bestList",
    "resultsTableHead",
    "resultsTableBody"
  ];
  ids.forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function bindEvents() {
  els.profileButton.addEventListener("click", () => openTimezoneGate(false));
  els.changeCreatorTimezoneButton.addEventListener("click", () => openTimezoneGate(false));
  els.changeParticipantTimezoneButton.addEventListener("click", () => openTimezoneGate(false));
  els.closeTimezoneButton.addEventListener("click", closeTimezoneGate);
  els.timezoneSearch.addEventListener("input", renderTimezoneResults);
  els.timezoneResults.addEventListener("click", onTimezoneOptionClick);
  els.addSlotButton.addEventListener("click", addSlot);
  els.addRangeButton.addEventListener("click", addRangeSlots);
  document.querySelectorAll("[data-range-preset]").forEach((button) => {
    button.addEventListener("click", () => applyRangePreset(button.dataset.rangePreset));
  });
  [els.rangeStartTime, els.rangeEndTime, els.rangeInterval].forEach((input) => {
    input.addEventListener("change", () => setRangePreset("custom"));
  });
  els.slotDate.addEventListener("change", () => {
    if (!els.rangeDate.value) {
      els.rangeDate.value = els.slotDate.value;
    }
  });
  els.slotList.addEventListener("click", onSlotListClick);
  els.createPollButton.addEventListener("click", createPoll);
  els.resetFormButton.addEventListener("click", resetForm);
  els.copyLinkButton.addEventListener("click", () => copyText(state.shareUrl, els.createMessage));
  els.copyManageLinkButton.addEventListener("click", () => copyText(state.shareAdminUrl, els.createMessage));
  els.lookupCreatorPollsButton.addEventListener("click", lookupCreatorPolls);
  els.creatorLookupName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      lookupCreatorPolls();
    }
  });
  els.creatorPollList.addEventListener("click", onCreatorPollListClick);
  els.creatorName.addEventListener("input", () => {
    const creatorName = cleanCreatorName(els.creatorName.value);
    localStorage.setItem(STORAGE_KEYS.creatorName, creatorName);
    if (!els.creatorLookupName.value.trim()) {
      els.creatorLookupName.value = creatorName;
    }
  });
  els.savePollDetailsButton.addEventListener("click", savePollDetails);
  els.confirmMeetingButton.addEventListener("click", confirmMeetingTime);
  els.sendCalendarInviteButton.addEventListener("click", sendCalendarInviteEmail);
  els.copyAttendeeEmailsButton.addEventListener("click", copyAttendeeEmails);
  els.emailProviderSelect.addEventListener("change", () => {
    localStorage.setItem(STORAGE_KEYS.emailProvider, getEmailProvider());
    renderFinalMeetingTools();
  });
  els.emailAttendeesLink.addEventListener("click", () => {
    setMessage(els.detailsMessage, t("emailDraftReady", { provider: getEmailProviderLabel(getEmailProvider()) }), "success");
  });
  els.openPollButton.addEventListener("click", () => {
    if (state.pollEncoded) {
      window.location.hash = `poll=${state.pollEncoded}`;
    }
  });
  els.loadDemoButton.addEventListener("click", loadDemo);
  els.newPollButton.addEventListener("click", () => {
    closeRealtime();
    window.location.hash = "";
    state.poll = null;
    state.pollEncoded = "";
    state.adminToken = "";
    state.shareAdminUrl = "";
    state.choices = {};
    state.votes = [];
    state.voteLocked = false;
    state.serverBacked = false;
    renderAll();
  });
  els.showResultsButton.addEventListener("click", () => {
    setView("results");
    renderResults();
  });
  els.backToVoteButton.addEventListener("click", () => {
    setView("vote");
    renderVote();
  });
  els.copyPollLinkButton.addEventListener("click", () => copyText(getPollLink(state.poll), null));
  els.voteSlots.addEventListener("click", onVoteSlotClick);
  els.submitVoteButton.addEventListener("click", submitVote);
  els.participantName.addEventListener("change", hydrateVoteForName);
  window.addEventListener("hashchange", () => routeFromHash());
}

function applyI18n() {
  state.lang = "en";
  document.documentElement.lang = "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
}

function t(key, params = {}) {
  const value = I18N[state.lang]?.[key] ?? I18N.en[key] ?? key;
  return typeof value === "function" ? value(params) : value;
}

async function routeFromHash() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const encoded = params.get("poll");
  const adminToken = params.get("admin") || "";
  if (!encoded) {
    closeRealtime();
    state.poll = null;
    state.pollEncoded = "";
    state.adminToken = "";
    state.shareAdminUrl = "";
    state.choices = {};
    state.votes = [];
    state.voteLocked = false;
    state.serverBacked = false;
    setView("create");
    renderAll();
    return;
  }

  try {
    closeRealtime();
    if (isServerPollKey(encoded)) {
      if (adminToken) {
        saveAdminToken(encoded, adminToken);
      }
      const savedAdminToken = adminToken || loadAdminToken(encoded);
      const payload = await apiFetchPoll(encoded, savedAdminToken);
      state.adminToken = savedAdminToken;
      applyRemotePayload(payload);
      state.choices = {};
      state.voteLocked = false;
      prepareVoteState();
      setView("vote");
      renderAll();
      connectRealtime();
      return;
    }

    const poll = decodePoll(encoded);
    validatePoll(poll);
    state.poll = poll;
    state.pollEncoded = encoded;
    state.adminToken = "";
    state.shareAdminUrl = "";
    state.shareUrl = getPollLink(poll);
    state.choices = {};
    state.votes = [];
    state.voteLocked = false;
    state.serverBacked = false;
    prepareVoteState();
    setView("vote");
    renderAll();
  } catch (error) {
    closeRealtime();
    state.serverBacked = false;
    setView("create");
    setMessage(els.createMessage, t("invalidPoll"), "error");
  }
}

function setView(name) {
  els.createView.classList.toggle("is-active", name === "create");
  els.voteView.classList.toggle("is-active", name === "vote");
  els.resultsView.classList.toggle("is-active", name === "results");
}

function renderAll() {
  renderProfileLabels();
  renderCreatorForm();
  renderCreatorLookup();
  renderSlotList();
  renderTimezoneResults();
  if (state.poll) {
    renderPollMeta(els.pollMeta, false);
    renderAdminTools();
    renderVote();
    renderResults();
  } else {
    renderAdminTools();
  }
}

function renderProfileLabels() {
  const profile = state.profile;
  const label = profile
    ? t("selectedTimezone", {
        country: getCountryName(profile.countryCode),
        gmt: formatGmtOffset(profile.timeZone, new Date())
      })
    : "GMT";
  els.profileLabel.textContent = label;
  [els.creatorTimezoneLabel, els.participantTimezoneLabel, els.resultsTimezoneLabel].forEach((node) => {
    node.textContent = label;
  });

  if (profile) {
    els.composerTimezoneText.textContent = t("creatorTimezone", {
      country: getCountryName(profile.countryCode),
      zone: getZoneLabel(profile.timeZone),
      gmt: formatGmtOffset(profile.timeZone, new Date())
    });
  } else {
    els.composerTimezoneText.textContent = "GMT";
  }
}

function renderCreatorForm() {
  const draft = loadDraft();
  const savedCreatorName = localStorage.getItem(STORAGE_KEYS.creatorName) || "";
  if (document.activeElement !== els.creatorName && !els.creatorName.value) {
    els.creatorName.value = draft.creatorName || savedCreatorName;
  }
  if (document.activeElement !== els.creatorLookupName && !els.creatorLookupName.value) {
    els.creatorLookupName.value = els.creatorName.value || savedCreatorName;
  }
  if (document.activeElement !== els.meetingTitle && !els.meetingTitle.value) {
    els.meetingTitle.value = draft.title || "";
  }
  if (document.activeElement !== els.meetingAgenda && !els.meetingAgenda.value) {
    els.meetingAgenda.value = draft.agenda || "";
  }
  if (document.activeElement !== els.meetingUrl && !els.meetingUrl.value) {
    els.meetingUrl.value = draft.meetingUrl || "";
  }
  els.shareBox.hidden = !state.shareUrl;
  els.shareLink.value = state.shareUrl;
  els.manageLinkField.hidden = !state.shareAdminUrl;
  els.manageLink.value = state.shareAdminUrl;
}

function renderCreatorLookup() {
  if (!els.creatorPollList) return;
  if (!state.creatorLookupSearched) {
    els.creatorPollList.innerHTML = "";
    return;
  }

  const polls = state.creatorPolls || [];
  if (!polls.length) {
    els.creatorPollList.innerHTML = `<div class="empty-state compact">${escapeHtml(t("creatorLookupEmpty"))}</div>`;
    return;
  }

  els.creatorPollList.innerHTML = polls
    .map((poll) => {
      const voteLink = getServerPollLink(poll.id);
      const manageLink = poll.adminToken ? getServerAdminPollLink(poll.id, poll.adminToken) : "";
      const createdAt = poll.createdAt ? formatDateTime(poll.createdAt) : "";
      const updatedAt = poll.updatedAt ? formatDateTime(poll.updatedAt) : "";
      return `
        <article class="creator-poll-card">
          <div class="creator-poll-summary">
            <div>
              <strong>${escapeHtml(poll.title)}</strong>
              <small>
                ${escapeHtml(t("responsesShort", { count: poll.voteCount || 0 }))}
                ${createdAt ? ` · ${escapeHtml(t("createdAtLabel"))}: ${escapeHtml(createdAt)}` : ""}
                ${updatedAt ? ` · ${escapeHtml(t("updatedAtLabel"))}: ${escapeHtml(updatedAt)}` : ""}
              </small>
            </div>
            <button class="danger-button" type="button" data-delete-poll-id="${escapeHtml(poll.id)}">${escapeHtml(t("deletePoll"))}</button>
          </div>
          <label class="field creator-link-field">
            <span>${escapeHtml(t("creatorPollLinkLabel"))}</span>
            <div class="copy-row">
              <input type="text" readonly value="${escapeHtml(voteLink)}" />
              <button class="secondary-button" type="button" data-copy-creator-link="${escapeHtml(voteLink)}">${escapeHtml(t("copyLink"))}</button>
            </div>
          </label>
          <label class="field creator-link-field">
            <span>${escapeHtml(t("creatorManageLinkLabel"))}</span>
            <div class="copy-row">
              <input type="text" readonly value="${escapeHtml(manageLink)}" />
              <button class="secondary-button" type="button" data-copy-creator-link="${escapeHtml(manageLink)}">${escapeHtml(t("copyManageLink"))}</button>
            </div>
          </label>
        </article>
      `;
    })
    .join("");
}

async function lookupCreatorPolls() {
  const creatorName = cleanCreatorName(els.creatorLookupName.value || els.creatorName.value);
  if (!creatorName) {
    setMessage(els.creatorLookupMessage, t("creatorNameRequired"), "error");
    els.creatorLookupName.focus();
    return;
  }

  els.creatorLookupName.value = creatorName;
  els.creatorName.value = els.creatorName.value.trim() || creatorName;
  localStorage.setItem(STORAGE_KEYS.creatorName, creatorName);

  try {
    const payload = await apiListCreatorPolls(creatorName);
    state.creatorPolls = payload.polls || [];
    state.creatorLookupSearched = true;
    state.creatorPolls.forEach((poll) => {
      if (poll.adminToken) {
        saveAdminToken(poll.id, poll.adminToken);
      }
    });
    renderCreatorLookup();
    setMessage(els.creatorLookupMessage, t("creatorLookupReady", { count: state.creatorPolls.length }), "success");
  } catch (error) {
    state.creatorLookupSearched = true;
    state.creatorPolls = [];
    renderCreatorLookup();
    setMessage(els.creatorLookupMessage, t("creatorLookupFailed"), "error");
  }
}

function onCreatorPollListClick(event) {
  const copyButton = event.target.closest("[data-copy-creator-link]");
  if (copyButton) {
    copyText(copyButton.dataset.copyCreatorLink, els.creatorLookupMessage);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-poll-id]");
  if (!deleteButton) return;
  deleteCreatorPoll(deleteButton.dataset.deletePollId);
}

async function deleteCreatorPoll(pollId) {
  const poll = (state.creatorPolls || []).find((item) => item.id === pollId);
  if (!poll?.adminToken) {
    setMessage(els.creatorLookupMessage, t("deletePollFailed"), "error");
    return;
  }

  const confirmed = window.confirm(t("deletePollConfirm", { title: poll.title }));
  if (!confirmed) return;

  try {
    await apiDeletePoll(poll.id, poll.adminToken);
    state.creatorPolls = (state.creatorPolls || []).filter((item) => item.id !== poll.id);
    if (state.poll?.id === poll.id) {
      closeRealtime();
      state.poll = null;
      state.pollEncoded = "";
      state.adminToken = "";
      state.shareUrl = "";
      state.shareAdminUrl = "";
      state.votes = [];
      state.serverBacked = false;
      window.location.hash = "";
      setView("create");
    }
    renderCreatorLookup();
    setMessage(els.creatorLookupMessage, t("deletePollDone"), "success");
  } catch (error) {
    setMessage(els.creatorLookupMessage, t("deletePollFailed"), "error");
  }
}

function mergeCreatorPolls(newPoll, existingPolls) {
  const byId = new Map([[newPoll.id, newPoll]]);
  existingPolls.forEach((poll) => {
    if (!byId.has(poll.id)) {
      byId.set(poll.id, poll);
    }
  });
  return Array.from(byId.values());
}

function renderSlotList() {
  els.slotCount.textContent = String(state.slots.length);
  if (!state.slots.length) {
    els.slotList.innerHTML = `<div class="empty-state">${escapeHtml(t("noSlots"))}</div>`;
    return;
  }

  const zone = state.profile?.timeZone || state.detectedTimeZone;
  els.slotList.innerHTML = state.slots
    .map((slot) => {
      const time = formatSlot(slot, zone);
      return `
        <article class="slot-card">
          <div>
            <strong>${escapeHtml(time.main)}</strong>
            <small>${escapeHtml(time.sub)} · ${escapeHtml(t("slotDuration", { minutes: slot.duration }))}</small>
          </div>
          <button class="ghost-button delete-slot" type="button" data-delete-slot="${escapeHtml(slot.id)}" aria-label="${escapeHtml(t("removeSlot"))}">×</button>
        </article>
      `;
    })
    .join("");
}

function openTimezoneGate(required) {
  state.timezoneRequired = required || !state.profile;
  els.closeTimezoneButton.hidden = state.timezoneRequired;
  els.timezoneGate.hidden = false;
  els.timezoneSearch.value = "";
  renderTimezoneResults();
  window.setTimeout(() => els.timezoneSearch.focus(), 0);
}

function closeTimezoneGate() {
  if (state.timezoneRequired && !state.profile) return;
  els.timezoneGate.hidden = true;
}

function renderTimezoneResults() {
  if (!els.timezoneResults) return;
  const query = normalizeSearch(els.timezoneSearch.value);
  const now = new Date();
  let options = state.countryOptions.map((option) => {
    const country = getCountryName(option.countryCode);
    const englishCountry = getCountryName(option.countryCode, "en");
    const zone = getZoneLabel(option.timeZone);
    const gmt = formatGmtOffset(option.timeZone, now);
    const search = normalizeSearch(`${country} ${englishCountry} ${option.countryCode} ${zone} ${option.timeZone} ${gmt}`);
    return { ...option, country, zone, gmt, search };
  });

  if (query) {
    options = options.filter((option) => option.search.includes(query));
  }

  options.sort((a, b) => {
    const detectedA = a.timeZone === state.detectedTimeZone ? -1 : 0;
    const detectedB = b.timeZone === state.detectedTimeZone ? -1 : 0;
    if (detectedA !== detectedB) return detectedA - detectedB;
    return a.country.localeCompare(b.country, state.lang === "zh" ? "zh-Hant" : "en");
  });

  if (!options.length) {
    els.timezoneResults.innerHTML = `<div class="empty-state">${escapeHtml(t("noTimezoneResults"))}</div>`;
    return;
  }

  els.timezoneResults.innerHTML = options
    .map((option) => {
      const isDetected = option.timeZone === state.detectedTimeZone;
      const detected = isDetected ? `<small class="timezone-city">${escapeHtml(t("detected"))}</small>` : "";
      return `
        <button class="timezone-option ${isDetected ? "is-detected" : ""}" type="button" role="option" data-country="${escapeHtml(option.countryCode)}" data-zone="${escapeHtml(option.timeZone)}">
          <span>
            <span class="timezone-country">${escapeHtml(option.country)}</span>
            <span class="timezone-city">${escapeHtml(option.zone)}</span>
            ${detected}
          </span>
          <span class="timezone-offset">${escapeHtml(option.gmt)}</span>
        </button>
      `;
    })
    .join("");
}

function onTimezoneOptionClick(event) {
  const button = event.target.closest("[data-zone]");
  if (!button) return;
  state.profile = {
    countryCode: button.dataset.country,
    timeZone: button.dataset.zone
  };
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(state.profile));
  if (!els.slotDate.value) {
    setDefaultSlotInputs();
  }
  closeTimezoneGate();
  renderAll();
}

function addSlot() {
  if (!requireProfile()) return;
  const date = els.slotDate.value;
  const time = els.slotTime.value;
  const duration = Number(els.slotDuration.value);
  if (!date || !time) {
    setMessage(els.createMessage, t("dateTimeRequired"), "error");
    return;
  }

  const start = zonedTimeToUtc(date, time, state.profile.timeZone);
  const startUtc = start.toISOString();
  const duplicate = state.slots.some((slot) => slot.startUtc === startUtc && slot.duration === duration);
  if (duplicate) {
    setMessage(els.createMessage, t("duplicateSlot"), "error");
    return;
  }

  state.slots.push({
    id: createId("slot"),
    startUtc,
    duration
  });
  state.slots.sort((a, b) => new Date(a.startUtc) - new Date(b.startUtc));
  saveDraft();
  setMessage(els.createMessage, "", "");
  renderSlotList();
}

function addRangeSlots() {
  if (!requireProfile()) return;
  const date = els.rangeDate.value;
  const startMinutes = parseRangeMinutes(els.rangeStartTime.value);
  const endMinutes = parseRangeMinutes(els.rangeEndTime.value);
  const interval = Number(els.rangeInterval.value);

  if (!date || startMinutes === null || endMinutes === null || ![30, 45, 60, 90, 120].includes(interval)) {
    setMessage(els.createMessage, t("rangeTimeRequired"), "error");
    els.rangeDate.focus();
    return;
  }

  if (endMinutes <= startMinutes) {
    setMessage(els.createMessage, t("rangeEndAfterStart"), "error");
    els.rangeEndTime.focus();
    return;
  }

  const existing = new Set(state.slots.map((slot) => `${slot.startUtc}:${slot.duration}`));
  const newSlots = [];
  let attemptedSlots = 0;

  for (let cursor = startMinutes; cursor + interval <= endMinutes; cursor += interval) {
    attemptedSlots += 1;
    const time = minutesToRangeTime(cursor);
    const startUtc = zonedTimeToUtc(date, time, state.profile.timeZone).toISOString();
    const key = `${startUtc}:${interval}`;
    if (existing.has(key)) continue;
    existing.add(key);
    newSlots.push({
      id: createId("slot"),
      startUtc,
      duration: interval
    });
  }

  if (!attemptedSlots) {
    setMessage(els.createMessage, t("rangeNoSlots"), "error");
    return;
  }

  if (!newSlots.length) {
    setMessage(els.createMessage, t("duplicateSlot"), "error");
    return;
  }

  state.slots.push(...newSlots);
  state.slots.sort((a, b) => new Date(a.startUtc) - new Date(b.startUtc));
  saveDraft();
  setMessage(els.createMessage, t("rangeAdded", { count: newSlots.length }), "success");
  renderSlotList();
}

function onSlotListClick(event) {
  const button = event.target.closest("[data-delete-slot]");
  if (!button) return;
  state.slots = state.slots.filter((slot) => slot.id !== button.dataset.deleteSlot);
  saveDraft();
  renderSlotList();
}

function populateRangeTimeOptions() {
  if (!els.rangeStartTime || !els.rangeEndTime) return;
  const startOptions = [];
  const endOptions = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
    startOptions.push(`<option value="${minutesToRangeTime(minutes)}">${minutesToRangeTime(minutes)}</option>`);
  }
  for (let minutes = 15; minutes <= 24 * 60; minutes += 15) {
    endOptions.push(`<option value="${minutesToRangeTime(minutes)}">${minutesToRangeTime(minutes)}</option>`);
  }
  els.rangeStartTime.innerHTML = startOptions.join("");
  els.rangeEndTime.innerHTML = endOptions.join("");
}

function applyRangePreset(preset) {
  const nextPreset = ["fullDay", "workHours", "custom"].includes(preset) ? preset : "custom";
  setRangePreset(nextPreset);

  if (nextPreset === "fullDay") {
    els.rangeStartTime.value = "00:00";
    els.rangeEndTime.value = "24:00";
    els.rangeInterval.value = "60";
  }

  if (nextPreset === "workHours") {
    els.rangeStartTime.value = "09:00";
    els.rangeEndTime.value = "18:00";
    els.rangeInterval.value = "60";
  }

  if (!els.rangeDate.value) {
    els.rangeDate.value = els.slotDate.value;
  }
}

function setRangePreset(preset) {
  state.rangePreset = preset;
  document.querySelectorAll("[data-range-preset]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.rangePreset === preset);
  });
}

async function createPoll() {
  if (!requireProfile()) return;
  const creatorName = cleanCreatorName(els.creatorName.value);
  if (!creatorName) {
    setMessage(els.createMessage, t("creatorNameRequired"), "error");
    els.creatorName.focus();
    return;
  }
  const title = els.meetingTitle.value.trim();
  if (!title) {
    setMessage(els.createMessage, t("titleRequired"), "error");
    els.meetingTitle.focus();
    return;
  }
  if (!state.slots.length) {
    setMessage(els.createMessage, t("slotRequired"), "error");
    return;
  }

  const meetingUrl = normalizeMeetingUrl(els.meetingUrl.value);
  const poll = {
    version: 1,
    id: createId("poll"),
    title,
    agenda: els.meetingAgenda.value.trim(),
    meetingUrl,
    creatorName,
    creatorKey: makeCreatorKey(creatorName),
    creator: { ...state.profile },
    slots: state.slots.map((slot) => ({ ...slot })),
    createdAt: new Date().toISOString()
  };

  try {
    const payload = await apiCreatePoll(poll);
    closeRealtime();
    applyRemotePayload(payload);
    connectRealtime();
  } catch (error) {
    state.poll = poll;
    state.pollEncoded = encodePoll(poll);
    state.adminToken = "";
    state.votes = [];
    state.serverBacked = false;
    state.shareUrl = getPollLink(poll);
    state.shareAdminUrl = "";
    setMessage(els.createMessage, t("syncFallback"), "error");
  }

  els.shareLink.value = state.shareUrl;
  els.manageLink.value = state.shareAdminUrl;
  els.manageLinkField.hidden = !state.shareAdminUrl;
  els.shareBox.hidden = false;
  if (state.serverBacked) {
    localStorage.setItem(STORAGE_KEYS.creatorName, creatorName);
    els.creatorLookupName.value = creatorName;
    state.creatorLookupSearched = true;
    state.creatorPolls = mergeCreatorPolls(
      {
        id: state.poll.id,
        title: state.poll.title,
        creatorName,
        createdAt: state.poll.createdAt,
        updatedAt: state.poll.updatedAt,
        voteCount: state.votes.length,
        adminToken: state.adminToken
      },
      state.creatorPolls || []
    );
    renderCreatorLookup();
    setMessage(els.createMessage, t("pollReady"), "success");
  }
  saveDraft();
}

function resetForm() {
  closeRealtime();
  state.slots = [];
  state.shareUrl = "";
  state.pollEncoded = "";
  state.adminToken = "";
  state.shareAdminUrl = "";
  state.poll = null;
  state.votes = [];
  state.serverBacked = false;
  els.meetingTitle.value = "";
  els.creatorName.value = localStorage.getItem(STORAGE_KEYS.creatorName) || "";
  els.meetingAgenda.value = "";
  els.meetingUrl.value = "";
  els.shareBox.hidden = true;
  localStorage.removeItem(STORAGE_KEYS.draft);
  setDefaultSlotInputs();
  renderSlotList();
  setMessage(els.createMessage, t("formReset"), "success");
}

function loadDemo() {
  if (!requireProfile()) return;
  const zone = state.profile.timeZone;
  const base = new Date(Date.now() + 2 * 86400000);
  const dates = [0, 1, 2].map((offset) => formatInputDate(new Date(base.getTime() + offset * 86400000), zone));
  if (!els.creatorName.value.trim()) {
    els.creatorName.value = "Nicole";
  }
  els.meetingTitle.value = state.lang === "zh" ? "跨區產品週會" : "Cross-region product sync";
  els.meetingAgenda.value =
    state.lang === "zh"
      ? "1. 產品里程碑\n2. 設計與工程風險\n3. 下一週決策"
      : "1. Product milestones\n2. Design and engineering risks\n3. Decisions for next week";
  els.meetingUrl.value = "https://meet.example.com/product-sync";
  state.slots = [
    { id: createId("slot"), startUtc: zonedTimeToUtc(dates[0], "09:00", zone).toISOString(), duration: 60 },
    { id: createId("slot"), startUtc: zonedTimeToUtc(dates[1], "14:00", zone).toISOString(), duration: 60 },
    { id: createId("slot"), startUtc: zonedTimeToUtc(dates[2], "16:30", zone).toISOString(), duration: 45 }
  ];
  saveDraft();
  renderSlotList();
  setMessage(els.createMessage, t("demoLoaded"), "success");
}

function renderPollMeta(target, compact) {
  if (!state.poll) {
    target.innerHTML = "";
    return;
  }
  const poll = state.poll;
  const creatorCountry = getCountryName(poll.creator.countryCode);
  const creatorName = poll.creatorName ? `${poll.creatorName} · ` : "";
  const creatorGmt = formatGmtOffset(poll.creator.timeZone, new Date(poll.createdAt));
  const agenda = poll.agenda || t("untitledAgenda");
  const link = poll.meetingUrl
    ? `<a class="meeting-link" href="${escapeHtml(poll.meetingUrl)}" target="_blank" rel="noreferrer">${escapeHtml(poll.meetingUrl)}</a>`
    : `<span>${escapeHtml(t("untitledLink"))}</span>`;
  const finalSlot = poll.finalSlotId ? poll.slots.find((slot) => slot.id === poll.finalSlotId) : null;
  const finalTime = finalSlot ? formatSlot(finalSlot, state.profile?.timeZone || state.detectedTimeZone) : null;
  const finalDetails = finalTime
    ? `
      <span class="detail-chip">${escapeHtml(t("finalMeeting"))}: ${escapeHtml(finalTime.main)} · ${escapeHtml(finalTime.sub)}</span>
      <span class="detail-chip">${escapeHtml(t("calendarInvite"))}: <a class="meeting-link" href="${escapeHtml(getCalendarInviteLink(poll, false))}">${escapeHtml(t("downloadCalendarInvite"))}</a></span>
    `
    : "";

  target.classList.toggle("compact", compact);
  target.innerHTML = `
    <div>
      <p class="eyebrow">${escapeHtml(compact ? t("resultsTitle") : t("localLabel"))}</p>
      <h1 id="${compact ? "resultsPollTitle" : "voteTitle"}">${escapeHtml(poll.title)}</h1>
    </div>
    <p class="poll-agenda">${escapeHtml(agenda)}</p>
    <div class="poll-details">
      <span class="detail-chip">${escapeHtml(t("creatorLabel"))}: ${escapeHtml(creatorName)}${escapeHtml(creatorCountry)} · ${escapeHtml(creatorGmt)}</span>
      <span class="detail-chip">${escapeHtml(t("meetingLink"))}: ${link}</span>
      ${finalDetails}
    </div>
  `;
}

function renderAdminTools() {
  if (!els.creatorTools) return;
  const canManage = Boolean(state.poll && state.adminToken && state.serverBacked);
  els.creatorTools.hidden = !canManage;
  if (!canManage) return;

  if (document.activeElement !== els.editMeetingTitle) {
    els.editMeetingTitle.value = state.poll.title || "";
  }
  if (document.activeElement !== els.editMeetingAgenda) {
    els.editMeetingAgenda.value = state.poll.agenda || "";
  }
  if (document.activeElement !== els.editMeetingUrl) {
    els.editMeetingUrl.value = state.poll.meetingUrl || "";
  }
  renderFinalMeetingTools();
}

function renderFinalMeetingTools() {
  if (!state.poll || !els.finalSlotSelect) return;
  const zone = state.profile?.timeZone || state.poll.creator?.timeZone || state.detectedTimeZone;
  const currentValue = els.finalSlotSelect.value || state.poll.finalSlotId || state.poll.slots[0]?.id || "";
  els.finalSlotSelect.innerHTML = state.poll.slots
    .map((slot) => {
      const time = formatSlot(slot, zone);
      return `<option value="${escapeHtml(slot.id)}">${escapeHtml(time.main)} · ${escapeHtml(time.sub)}</option>`;
    })
    .join("");
  els.finalSlotSelect.value = state.poll.slots.some((slot) => slot.id === currentValue) ? currentValue : state.poll.slots[0]?.id || "";
  const emails = getAttendeeEmails();
  const emailProvider = getEmailProvider();
  const inviteSent = Boolean(state.poll.inviteSentAt && state.poll.inviteSentFinalSlotId === state.poll.finalSlotId);
  els.emailProviderSelect.value = emailProvider;
  els.emailProviderSelect.disabled = !state.poll.finalSlotId || !emails.length;
  els.attendeeEmailList.value = emails.join(", ");
  els.attendeeEmailList.placeholder = t("attendeeEmailsPlaceholder");
  els.sendCalendarInviteButton.hidden = !state.poll.finalSlotId || !emails.length || !state.adminToken;
  els.sendCalendarInviteButton.disabled = inviteSent;
  els.sendCalendarInviteButton.textContent = inviteSent ? t("calendarInviteSent") : t("sendCalendarInvite");
  els.emailAttendeesLink.hidden = !state.poll.finalSlotId || !emails.length;
  els.emailAttendeesLink.href = state.poll.finalSlotId ? getEmailInviteLink(state.poll, emails, emailProvider) : "#";
  els.emailAttendeesLink.target = emailProvider === "mailto" ? "" : "_blank";
  els.calendarInviteLink.hidden = !state.poll.finalSlotId;
  els.calendarInviteLink.href = state.poll.finalSlotId ? getCalendarInviteLink(state.poll, true) : "#";
  els.copyAttendeeEmailsButton.disabled = !emails.length;
}

async function savePollDetails() {
  if (!state.poll || !state.adminToken) {
    setMessage(els.detailsMessage, t("manageDenied"), "error");
    return;
  }

  const title = els.editMeetingTitle.value.trim();
  if (!title) {
    setMessage(els.detailsMessage, t("titleRequired"), "error");
    els.editMeetingTitle.focus();
    return;
  }

  try {
    const payload = await apiUpdatePoll(state.poll.id, {
      title,
      agenda: els.editMeetingAgenda.value.trim(),
      meetingUrl: normalizeMeetingUrl(els.editMeetingUrl.value),
      adminToken: state.adminToken
    });
    applyRemotePayload(payload);
    renderAll();
    setMessage(els.detailsMessage, t("detailsSaved"), "success");
  } catch (error) {
    setMessage(els.detailsMessage, t("manageDenied"), "error");
  }
}

async function confirmMeetingTime() {
  if (!state.poll || !state.adminToken) {
    setMessage(els.detailsMessage, t("manageDenied"), "error");
    return;
  }
  const finalSlotId = els.finalSlotSelect.value;
  if (!state.poll.slots.some((slot) => slot.id === finalSlotId)) {
    setMessage(els.detailsMessage, t("rangeTimeRequired"), "error");
    return;
  }

  try {
    const payload = await apiUpdatePoll(state.poll.id, {
      finalSlotId,
      adminToken: state.adminToken
    });
    applyRemotePayload(payload);
    renderAll();
    setMessage(els.detailsMessage, t("finalMeetingSaved"), "success");
  } catch (error) {
    setMessage(els.detailsMessage, t("manageDenied"), "error");
  }
}

async function sendCalendarInviteEmail() {
  if (!state.poll || !state.adminToken) {
    setMessage(els.detailsMessage, t("manageDenied"), "error");
    return;
  }
  const emails = getAttendeeEmails();
  if (!state.poll.finalSlotId || !emails.length) {
    setMessage(els.detailsMessage, t("noAttendeeEmails"), "error");
    return;
  }

  els.sendCalendarInviteButton.disabled = true;
  els.sendCalendarInviteButton.textContent = t("sendingCalendarInvite");
  try {
    const payload = await apiNotifyAttendees(state.poll.id, state.adminToken);
    applyRemotePayload(payload);
    renderAll();
    setMessage(els.detailsMessage, t("calendarEmailSent", { count: payload.notification?.count || emails.length }), "success");
  } catch (error) {
    setMessage(els.detailsMessage, error.payload?.error || error.message || t("calendarEmailFailed"), "error");
    renderFinalMeetingTools();
  }
}

async function copyAttendeeEmails() {
  const emails = getAttendeeEmails();
  if (!emails.length) {
    setMessage(els.detailsMessage, t("noAttendeeEmails"), "error");
    return;
  }
  const copied = await copyText(emails.join(", "), null);
  setMessage(els.detailsMessage, copied ? t("attendeeEmailsCopied", { count: emails.length }) : t("copyFailed"), copied ? "success" : "error");
}

function prepareVoteState() {
  if (!state.poll) return;
  const lastName = localStorage.getItem(lastNameKey(state.poll.id)) || "";
  if (lastName) {
    els.participantName.value = lastName;
    applyVoteForName(lastName);
  }
}

function renderVote() {
  if (!state.poll) return;
  renderPollMeta(els.pollMeta, false);
  if (!els.participantName.value) {
    els.participantName.value = localStorage.getItem(lastNameKey(state.poll.id)) || "";
  }
  applyVoteForName(els.participantName.value.trim(), false);
  const existingVote = getVoteByName(els.participantName.value.trim());
  if (existingVote?.email && document.activeElement !== els.participantEmail) {
    els.participantEmail.value = existingVote.email;
  }
  const zone = state.profile?.timeZone || state.detectedTimeZone;
  const disabled = state.voteLocked ? "disabled" : "";
  els.voteSlots.innerHTML = state.poll.slots
    .map((slot) => {
      const time = formatSlot(slot, zone);
      const choice = state.choices[slot.id];
      return `
        <article class="vote-slot-card">
          <div class="vote-slot-time">
            <strong>${escapeHtml(time.main)}</strong>
            <small>${escapeHtml(time.sub)} · ${escapeHtml(t("slotDuration", { minutes: slot.duration }))}</small>
          </div>
          <div class="choice-group" role="group" aria-label="${escapeHtml(time.main)}">
            <button class="choice-button ${choice === "yes" ? "is-selected" : ""}" type="button" data-slot-id="${escapeHtml(slot.id)}" data-choice="yes" ${disabled}>${escapeHtml(t("canAttend"))}</button>
            <button class="choice-button ${choice === "no" ? "is-selected" : ""}" type="button" data-slot-id="${escapeHtml(slot.id)}" data-choice="no" ${disabled}>${escapeHtml(t("cannotAttend"))}</button>
          </div>
        </article>
      `;
    })
    .join("");
  updateVoteControls();
}

function hydrateVoteForName() {
  if (!state.poll) return;
  applyVoteForName(els.participantName.value.trim());
  renderVote();
}

function applyVoteForName(name, replaceChoices = true) {
  const existingVote = getVoteByName(name);
  state.voteLocked = Boolean(existingVote);
  if (existingVote || replaceChoices) {
    state.choices = { ...(existingVote?.choices || {}) };
  }
  if (existingVote?.email && document.activeElement !== els.participantEmail) {
    els.participantEmail.value = existingVote.email;
  }
}

function getVoteByName(name) {
  if (!state.poll || !name) return null;
  return loadVotes()[name] || null;
}

function updateVoteControls() {
  els.submitVoteButton.disabled = state.voteLocked;
  els.participantEmail.disabled = state.voteLocked;
  els.submitVoteButton.textContent = state.voteLocked ? t("submittedVote") : t("submitVote");
  if (state.voteLocked) {
    setMessage(els.voteMessage, t("voteLocked"), "success");
  } else if ([t("voteLocked"), t("voteAlreadySubmitted")].includes(els.voteMessage.textContent)) {
    setMessage(els.voteMessage, "", "");
  }
}

function onVoteSlotClick(event) {
  if (state.voteLocked) return;
  const button = event.target.closest("[data-slot-id][data-choice]");
  if (!button) return;
  state.choices[button.dataset.slotId] = button.dataset.choice;
  renderVote();
}

async function submitVote() {
  if (!state.poll) return;
  if (!requireProfile()) return;
  const name = els.participantName.value.trim();
  if (!name) {
    setMessage(els.voteMessage, t("nameRequired"), "error");
    els.participantName.focus();
    return;
  }
  const email = cleanEmail(els.participantEmail.value);
  if (!email) {
    setMessage(els.voteMessage, t("emailRequired"), "error");
    els.participantEmail.focus();
    return;
  }

  const existingVote = getVoteByName(name);
  if (existingVote) {
    state.choices = { ...existingVote.choices };
    state.voteLocked = true;
    renderVote();
    setMessage(els.voteMessage, t("voteAlreadySubmitted"), "success");
    setView("results");
    renderResults();
    return;
  }

  const incomplete = state.poll.slots.some((slot) => !state.choices[slot.id]);
  if (incomplete) {
    setMessage(els.voteMessage, t("voteIncomplete"), "error");
    return;
  }

  const vote = {
    name,
    email,
    countryCode: state.profile.countryCode,
    timeZone: state.profile.timeZone,
    choices: { ...state.choices },
    updatedAt: new Date().toISOString()
  };

  if (state.serverBacked) {
    try {
      const payload = await apiSubmitVote(state.poll.id, vote);
      applyRemotePayload(payload);
      localStorage.setItem(lastNameKey(state.poll.id), name);
      setMessage(els.voteMessage, t("voteSaved"), "success");
      setView("results");
      renderResults();
      return;
    } catch (error) {
      if (error.status === 409 && error.payload?.alreadyVoted) {
        applyRemotePayload(error.payload);
        localStorage.setItem(lastNameKey(state.poll.id), name);
        applyVoteForName(name);
        setMessage(els.voteMessage, t("voteAlreadySubmitted"), "success");
        setView("results");
        renderResults();
        return;
      }
      setMessage(els.voteMessage, t("syncFailed"), "error");
      return;
    }
  }

  const votes = loadVotes();
  votes[name] = vote;
  localStorage.setItem(votesKey(state.poll.id), JSON.stringify(votes));
  localStorage.setItem(lastNameKey(state.poll.id), name);
  setMessage(els.voteMessage, t("voteSaved"), "success");
  setView("results");
  renderResults();
}

function renderResults() {
  if (!state.poll) return;
  renderPollMeta(els.resultsMeta, true);
  const votes = getVotesList();
  const zone = state.profile?.timeZone || state.detectedTimeZone;
  const rows = state.poll.slots.map((slot) => {
    const yes = votes.filter((vote) => vote.choices?.[slot.id] === "yes");
    const no = votes.filter((vote) => vote.choices?.[slot.id] === "no");
    return { slot, yes, no };
  });

  const best = [...rows].sort((a, b) => b.yes.length - a.yes.length || a.no.length - b.no.length);
  if (!votes.length) {
    els.bestList.innerHTML = `<div class="empty-state">${escapeHtml(t("noVotes"))}</div>`;
  } else {
    els.bestList.innerHTML = best
      .slice(0, Math.min(3, best.length))
      .map((row) => {
        const time = formatSlot(row.slot, zone);
        return `
          <article class="best-card">
            <strong>${escapeHtml(time.main)}</strong>
            <small>${escapeHtml(time.sub)} · ${escapeHtml(t("yesCount", { count: row.yes.length }))} · ${escapeHtml(t("noCount", { count: row.no.length }))}</small>
          </article>
        `;
      })
      .join("");
  }

  els.resultsTableHead.innerHTML = `
    <tr>
      <th>${escapeHtml(t("timeColumn"))}</th>
      <th>${escapeHtml(t("canAttend"))}</th>
      <th>${escapeHtml(t("cannotAttend"))}</th>
      <th>${escapeHtml(t("availablePeople"))}</th>
      <th>${escapeHtml(t("unavailablePeople"))}</th>
    </tr>
  `;

  els.resultsTableBody.innerHTML = rows
    .map((row) => {
      const time = formatSlot(row.slot, zone);
      const yesNames = row.yes.map((vote) => vote.name).join(", ");
      const noNames = row.no.map((vote) => vote.name).join(", ");
      return `
        <tr>
          <td><strong>${escapeHtml(time.main)}</strong><br><small>${escapeHtml(time.sub)}</small></td>
          <td class="yes-text">${row.yes.length}</td>
          <td class="no-text">${row.no.length}</td>
          <td>${escapeHtml(yesNames || "—")}</td>
          <td>${escapeHtml(noNames || "—")}</td>
        </tr>
      `;
    })
    .join("");
}

function requireProfile() {
  if (state.profile) return true;
  openTimezoneGate(true);
  return false;
}

function setDefaultSlotInputs() {
  const zone = state.profile?.timeZone || state.detectedTimeZone;
  const tomorrow = new Date(Date.now() + 86400000);
  const date = formatInputDate(tomorrow, zone);
  els.slotDate.value = date;
  els.slotTime.value = "09:00";
  els.rangeDate.value = els.rangeDate.value || date;
  applyRangePreset(state.rangePreset || "workHours");
}

function loadLanguage() {
  localStorage.setItem(STORAGE_KEYS.lang, "en");
  return "en";
}

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || "null");
    if (saved?.countryCode && saved?.timeZone && isValidTimeZone(saved.timeZone)) {
      return saved;
    }
  } catch (error) {
    return null;
  }
  return null;
}

function loadDraft() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.draft) || "{}");
  } catch (error) {
    return {};
  }
}

function loadDraftSlots() {
  const draft = loadDraft();
  return Array.isArray(draft.slots) ? draft.slots : [];
}

function saveDraft() {
  const draft = {
    creatorName: els.creatorName.value,
    title: els.meetingTitle.value,
    agenda: els.meetingAgenda.value,
    meetingUrl: els.meetingUrl.value,
    slots: state.slots
  };
  localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(draft));
}

function getDetectedTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch (error) {
    return "UTC";
  }
}

function buildCountryOptions() {
  const seen = new Set();
  return COUNTRY_ZONES.flatMap(([countryCode, zones]) =>
    zones.split("|").map((zone) => ({
      countryCode,
      timeZone: resolveTimeZone(zone)
    }))
  )
    .filter((option) => option.timeZone)
    .filter((option) => {
      const key = `${option.countryCode}:${option.timeZone}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function resolveTimeZone(zone) {
  if (isValidTimeZone(zone)) {
    return getCanonicalTimeZone(zone);
  }
  const fallback = ZONE_FALLBACKS[zone];
  if (fallback && isValidTimeZone(fallback)) {
    return getCanonicalTimeZone(fallback);
  }
  return "";
}

function isValidTimeZone(zone) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: zone }).format(new Date());
    return true;
  } catch (error) {
    return false;
  }
}

function getCanonicalTimeZone(zone) {
  try {
    return new Intl.DateTimeFormat("en-US", { timeZone: zone }).resolvedOptions().timeZone;
  } catch (error) {
    return zone;
  }
}

function getCountryName(code, lang = state.lang) {
  if (REGION_FALLBACKS[code]) {
    return REGION_FALLBACKS[code][lang] || REGION_FALLBACKS[code].en;
  }
  try {
    const locale = lang === "zh" ? "zh-Hant" : "en";
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) || code;
  } catch (error) {
    return code;
  }
}

function getZoneLabel(timeZone) {
  return timeZone
    .split("/")
    .slice(1)
    .join(" / ")
    .replace(/_/g, " ");
}

function formatSlot(slot, timeZone) {
  const start = new Date(slot.startUtc);
  const end = new Date(start.getTime() + slot.duration * 60000);
  const locale = state.lang === "zh" ? "zh-Hant-TW" : "en-US";
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });
  const gmt = formatGmtOffset(timeZone, start);
  return {
    main: `${dateFormatter.format(start)} · ${timeFormatter.format(start)}-${timeFormatter.format(end)}`,
    sub: `${gmt} · ${getZoneLabel(timeZone)}`
  };
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const locale = state.lang === "zh" ? "zh-Hant-TW" : "en-US";
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  };
  if (state.profile?.timeZone) {
    options.timeZone = state.profile.timeZone;
  }
  return new Intl.DateTimeFormat(locale, options).format(date);
}

function parseRangeMinutes(value) {
  const match = /^(\d{2}):(\d{2})$/.exec(value || "");
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours === 24 && minutes === 0) return 24 * 60;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function minutesToRangeTime(value) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatInputDate(date, timeZone) {
  const parts = getZonedParts(date, timeZone);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function zonedTimeToUtc(dateValue, timeValue, timeZone) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hour, minute] = timeValue.split(":").map(Number);
  let utcMs = Date.UTC(year, month - 1, day, hour, minute, 0);
  for (let i = 0; i < 3; i += 1) {
    utcMs = Date.UTC(year, month - 1, day, hour, minute, 0) - getTimeZoneOffsetMs(timeZone, new Date(utcMs));
  }
  return new Date(utcMs);
}

function getZonedParts(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });
  const map = {};
  formatter.formatToParts(date).forEach((part) => {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  });
  return map;
}

function getTimeZoneOffsetMs(timeZone, date) {
  const parts = getZonedParts(date, timeZone);
  const utcFromZonedParts = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return utcFromZonedParts - date.getTime();
}

function formatGmtOffset(timeZone, date) {
  const offsetMinutes = Math.round(getTimeZoneOffsetMs(timeZone, date) / 60000);
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absolute / 60)).padStart(2, "0");
  const minutes = String(absolute % 60).padStart(2, "0");
  return `GMT${sign}${hours}:${minutes}`;
}

function encodePoll(poll) {
  const json = JSON.stringify(poll);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodePoll(encoded) {
  const padded = encoded.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encoded.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function validatePoll(poll) {
  if (!poll || poll.version !== 1 || !poll.id || !poll.title || !Array.isArray(poll.slots)) {
    throw new Error("Invalid poll");
  }
}

function getPollLink(poll) {
  if (!poll) return "";
  const encoded = state.serverBacked ? poll.id : state.pollEncoded && state.poll?.id === poll.id ? state.pollEncoded : encodePoll(poll);
  return `${getBaseUrl()}#poll=${encoded}`;
}

function getAdminPollLink(poll) {
  if (!poll || !state.adminToken || !state.serverBacked) return "";
  return getServerAdminPollLink(poll.id, state.adminToken);
}

function getServerPollLink(pollId) {
  return `${getBaseUrl()}#poll=${encodeURIComponent(pollId)}`;
}

function getServerAdminPollLink(pollId, adminToken) {
  return `${getBaseUrl()}#poll=${encodeURIComponent(pollId)}&admin=${encodeURIComponent(adminToken)}`;
}

function getCalendarInviteLink(poll, includeAdminToken = false) {
  const adminQuery = includeAdminToken && state.adminToken ? `?adminToken=${encodeURIComponent(state.adminToken)}` : "";
  return `${getBaseUrl()}api/polls/${encodeURIComponent(poll.id)}/calendar.ics${adminQuery}`;
}

function getEmailProvider() {
  const selected = els.emailProviderSelect?.value || getStoredEmailProvider();
  return ["gmail", "outlook", "mailto"].includes(selected) ? selected : "gmail";
}

function getStoredEmailProvider() {
  const saved = localStorage.getItem(STORAGE_KEYS.emailProvider);
  return ["gmail", "outlook", "mailto"].includes(saved) ? saved : "gmail";
}

function getEmailProviderLabel(provider) {
  const labels = {
    gmail: t("emailProviderGmail"),
    outlook: t("emailProviderOutlook"),
    mailto: t("emailProviderDefault")
  };
  return labels[provider] || labels.gmail;
}

function getEmailInviteLink(poll, emails, provider = "gmail") {
  const finalSlot = poll.finalSlotId ? poll.slots.find((slot) => slot.id === poll.finalSlotId) : null;
  const finalTime = finalSlot ? formatSlot(finalSlot, state.profile?.timeZone || state.detectedTimeZone) : null;
  const subject = `Confirmed: ${poll.title}`;
  const bodyLines = [
    `Hi,`,
    "",
    `The meeting has been confirmed.`,
    "",
    `Topic: ${poll.title}`,
    `Time: ${finalTime ? `${finalTime.main} (${finalTime.sub})` : "Confirmed time"}`,
    ...(poll.meetingUrl ? [`Meeting link: ${poll.meetingUrl}`] : []),
    `Add to calendar: ${getCalendarInviteLink(poll, false)}`,
    "",
    `Poll results: ${getPollLink(poll)}`,
    "",
    `Thank you.`
  ];
  const body = bodyLines.join("\n");
  const bcc = emails.join(",");
  if (provider === "outlook") {
    return `https://outlook.office.com/mail/deeplink/compose?${new URLSearchParams({ bcc, subject, body }).toString()}`;
  }
  if (provider === "mailto") {
    return `mailto:?bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return `https://mail.google.com/mail/?${new URLSearchParams({ view: "cm", fs: "1", bcc, su: subject, body }).toString()}`;
}

function getBaseUrl() {
  return window.location.href.split("#")[0];
}

function isServerPollKey(value) {
  return /^poll_[A-Za-z0-9_-]+$/.test(value);
}

function cleanCreatorName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 70);
}

function cleanEmail(value) {
  const email = String(value || "").trim().toLowerCase().slice(0, 254);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

function makeCreatorKey(value) {
  return cleanCreatorName(value).toLowerCase();
}

function normalizeMeetingUrl(value) {
  const raw = value.trim();
  if (!raw) return "";
  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withProtocol);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch (error) {
    return "";
  }
}

function loadVotes() {
  if (!state.poll) return {};
  if (state.serverBacked) {
    return Object.fromEntries((state.votes || []).map((vote) => [vote.name, vote]));
  }
  try {
    return JSON.parse(localStorage.getItem(votesKey(state.poll.id)) || "{}");
  } catch (error) {
    return {};
  }
}

function getVotesList() {
  if (state.serverBacked) {
    return state.votes || [];
  }
  return Object.values(loadVotes());
}

function getAttendeeEmails() {
  const seen = new Set();
  return getVotesList()
    .map((vote) => cleanEmail(vote.email))
    .filter((email) => {
      if (!email || seen.has(email)) return false;
      seen.add(email);
      return true;
    });
}

function applyRemotePayload(payload) {
  validatePoll(payload.poll);
  state.poll = payload.poll;
  state.pollEncoded = payload.poll.id;
  state.votes = Array.isArray(payload.votes) ? payload.votes : [];
  state.serverBacked = true;
  state.adminToken = payload.adminToken || state.adminToken || loadAdminToken(payload.poll.id);
  if (state.adminToken) {
    saveAdminToken(payload.poll.id, state.adminToken);
  }
  state.shareUrl = getPollLink(payload.poll);
  state.shareAdminUrl = getAdminPollLink(payload.poll);
}

async function apiCreatePoll(poll) {
  return apiRequest("/api/polls", {
    method: "POST",
    body: JSON.stringify(poll)
  });
}

async function apiFetchPoll(pollId, adminToken = "") {
  const query = adminToken ? `?adminToken=${encodeURIComponent(adminToken)}` : "";
  return apiRequest(`/api/polls/${encodeURIComponent(pollId)}${query}`);
}

async function apiSubmitVote(pollId, vote) {
  return apiRequest(`/api/polls/${encodeURIComponent(pollId)}/votes`, {
    method: "POST",
    body: JSON.stringify(vote)
  });
}

async function apiUpdatePoll(pollId, updates) {
  return apiRequest(`/api/polls/${encodeURIComponent(pollId)}`, {
    method: "PATCH",
    body: JSON.stringify(updates)
  });
}

async function apiNotifyAttendees(pollId, adminToken) {
  return apiRequest(`/api/polls/${encodeURIComponent(pollId)}/notify`, {
    method: "POST",
    body: JSON.stringify({ adminToken })
  });
}

async function apiDeletePoll(pollId, adminToken) {
  return apiRequest(`/api/polls/${encodeURIComponent(pollId)}`, {
    method: "DELETE",
    body: JSON.stringify({ adminToken })
  });
}

async function apiListCreatorPolls(creatorName) {
  return apiRequest(`/api/creators/${encodeURIComponent(creatorName)}/polls`);
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Request failed");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

function connectRealtime() {
  closeRealtime();
  if (!state.serverBacked || !window.EventSource) return;
  const query = state.adminToken ? `?adminToken=${encodeURIComponent(state.adminToken)}` : "";
  const source = new EventSource(`/api/polls/${encodeURIComponent(state.poll.id)}/events${query}`);
  state.realtimeSource = source;

  const handleUpdate = (event) => {
    const payload = JSON.parse(event.data);
    applyRemotePayload(payload);
    renderVote();
    renderResults();
  };

  source.addEventListener("snapshot", handleUpdate);
  source.addEventListener("poll:update", handleUpdate);
  source.addEventListener("poll:deleted", () => {
    closeRealtime();
    state.poll = null;
    state.pollEncoded = "";
    state.adminToken = "";
    state.shareUrl = "";
    state.shareAdminUrl = "";
    state.votes = [];
    state.serverBacked = false;
    window.location.hash = "";
    setView("create");
    renderAll();
    setMessage(els.createMessage, t("pollDeleted"), "error");
  });
}

function closeRealtime() {
  if (state.realtimeSource) {
    state.realtimeSource.close();
    state.realtimeSource = null;
  }
}

function saveAdminToken(pollId, token) {
  localStorage.setItem(adminTokenKey(pollId), token);
}

function loadAdminToken(pollId) {
  return localStorage.getItem(adminTokenKey(pollId)) || "";
}

function adminTokenKey(pollId) {
  return `gmt-rally-admin-token:${pollId}`;
}

function votesKey(pollId) {
  return `gmt-rally-votes:${pollId}`;
}

function lastNameKey(pollId) {
  return `gmt-rally-last-name:${pollId}`;
}

function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

async function copyText(text, messageElement) {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    if (messageElement) {
      setMessage(messageElement, t("copied"), "success");
    }
    return true;
  } catch (error) {
    if (messageElement) {
      setMessage(messageElement, t("copyFailed"), "error");
    }
    return false;
  }
}

function setMessage(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("is-error", type === "error");
  element.classList.toggle("is-success", type === "success");
}

function normalizeSearch(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
