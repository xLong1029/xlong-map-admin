import{aw as _,ac as c}from"./vendor.c6be4c00.js";import{a as l}from"./moment.381ce4a1.js";function j(r,n){return n.forEach(function(t){t&&typeof t!="string"&&!Array.isArray(t)&&Object.keys(t).forEach(function(s){if(s!=="default"&&!(s in r)){var o=Object.getOwnPropertyDescriptor(t,s);Object.defineProperty(r,s,o.get?o:{enumerable:!0,get:function(){return t[s]}})}})}),Object.freeze(r)}var u={exports:{}};(function(r,n){(function(t,s){s(typeof _=="function"?l.exports:t.moment)})(c,function(t){//! moment.js locale configuration
function s(a,i,d){var e=a+" ";switch(d){case"ss":return a===1?e+="sekunda":a===2||a===3||a===4?e+="sekunde":e+="sekundi",e;case"m":return i?"jedna minuta":"jedne minute";case"mm":return a===1?e+="minuta":a===2||a===3||a===4?e+="minute":e+="minuta",e;case"h":return i?"jedan sat":"jednog sata";case"hh":return a===1?e+="sat":a===2||a===3||a===4?e+="sata":e+="sati",e;case"dd":return a===1?e+="dan":e+="dana",e;case"MM":return a===1?e+="mjesec":a===2||a===3||a===4?e+="mjeseca":e+="mjeseci",e;case"yy":return a===1?e+="godina":a===2||a===3||a===4?e+="godine":e+="godina",e}}var o=t.defineLocale("hr",{months:{format:"sije\u010Dnja_velja\u010De_o\u017Eujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),standalone:"sije\u010Danj_velja\u010Da_o\u017Eujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")},monthsShort:"sij._velj._o\u017Eu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010Det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010De_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"Do MMMM YYYY",LLL:"Do MMMM YYYY H:mm",LLLL:"dddd, Do MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010Der u] LT",lastWeek:function(){switch(this.day()){case 0:return"[pro\u0161lu] [nedjelju] [u] LT";case 3:return"[pro\u0161lu] [srijedu] [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",ss:s,m:s,mm:s,h:s,hh:s,d:"dan",dd:s,M:"mjesec",MM:s,y:"godinu",yy:s},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});return o})})();var p=u.exports,L=Object.freeze(j({__proto__:null,[Symbol.toStringTag]:"Module",default:p},[u.exports]));export{L as h};