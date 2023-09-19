import { c as create_ssr_component, a as subscribe, b as each, e as escape, d as add_attribute, n as noop } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}
const cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: () => {
  throw Error("TextEncoder not available");
} };
typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
const heap = new Array(128).fill(void 0);
heap.push(void 0, null, true, false);
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let values;
  let input_letters;
  let output_letters;
  let $ncols, $$unsubscribe_ncols;
  let $input_cols_n, $$unsubscribe_input_cols_n;
  let $values, $$unsubscribe_values = noop, $$subscribe_values = () => ($$unsubscribe_values(), $$unsubscribe_values = subscribe(values, ($$value) => $values = $$value), values);
  let $outs, $$unsubscribe_outs;
  let input_cols_n = writable(3);
  $$unsubscribe_input_cols_n = subscribe(input_cols_n, (value) => $input_cols_n = value);
  let ncols = writable(3);
  $$unsubscribe_ncols = subscribe(ncols, (value) => $ncols = value);
  let container;
  let outs = writable([]);
  $$unsubscribe_outs = subscribe(outs, (value) => $outs = value);
  let binvals = [];
  let oalphabet = ["X", "Y", "Z", "W", "V", "U", "T", "S", "Q", "R"];
  let counts = Array.from({ length: 10 }, (_, i) => i + 1);
  $$subscribe_values(values = writable(Array($ncols * Math.pow(2, $input_cols_n)).fill(0)));
  {
    {
      for (let r = 0; r < $ncols; r++) {
        let vals = [];
        for (let i = 0; i < $values.length; i += $ncols) {
          vals.push($values[i + r]);
        }
      }
    }
  }
  {
    {
      binvals = [];
      for (let i = 0; i <= Math.pow(2, $input_cols_n) - 1; i++) {
        binvals.push(i.toString(2).padStart($input_cols_n, "0").split("").map((x) => parseInt(x)));
      }
    }
  }
  input_letters = alphabet.slice(0, $input_cols_n);
  output_letters = oalphabet.slice(0, $ncols);
  $$unsubscribe_ncols();
  $$unsubscribe_input_cols_n();
  $$unsubscribe_values();
  $$unsubscribe_outs();
  return `<div class="flex items-start gap-2 p-2"><div class="border border-zinc-100 rounded-sm w-56 p-4 flex flex-col gap-4"><div><h2 class="text-lg" data-svelte-h="svelte-iuxqh3">Input Count</h2> <div class="flex gap-1 flex-wrap">${each(counts, (count) => {
    return `<button class="${"rounded-full shadow-sm h-8 w-8 transition-colors duration-175 " + escape(
      count == $input_cols_n ? "bg-blue-500 text-white font-bold" : "bg-blue-100 text-black",
      true
    )}">${escape(count)}</button>`;
  })}</div></div> <div><h2 class="text-lg" data-svelte-h="svelte-18675ew">Output Count</h2> <div class="flex gap-1 flex-wrap">${each(counts, (count) => {
    return `<button class="${"rounded-full shadow-sm h-8 w-8 transition-colors duration-175 " + escape(
      count == $ncols ? "bg-blue-500 text-white font-bold" : "bg-blue-100",
      true
    )}">${escape(count)}</button>`;
  })}</div></div> <div>${each($outs, (out, i) => {
    return `<h2 class="text-lg">Simplified ${escape(output_letters[i])}</h2> ${out ? `<div class="border-[0.5px] border-zinc-400 px-4 rounded-md">${escape(out)} </div>` : ``}`;
  })}</div></div> <div class="flex font-mono"><div class="grid grid-cols-4" style="${"grid-template-columns: repeat(" + escape($input_cols_n + 1, true) + ", 1.6em)"}"><div></div> ${each(input_letters, (lett) => {
    return `<div class="outline-none bg-zinc-200 border-[0.5px] border-blue-200 select-none text-center font-bold duration-100 h-6">${escape(lett)} </div>`;
  })} ${each(binvals, (row, i) => {
    return `<div class="rounded-full text-xs grid place-items-center"><div class="bg-blue-50 rounded-full w-5 h-5 grid place-items-center font-sans">${escape(i)} </div></div> ${each(row, (bit) => {
      return `<div class="outline-none bg-zinc-200 border-[0.5px] border-blue-200 select-none text-center font-bold duration-100">${escape(bit)} </div>`;
    })}`;
  })}</div> <div class="grid" style="${"grid-template-columns: repeat(" + escape($ncols, true) + ", 1.6em)"}"${add_attribute("this", container, 0)}>${each(output_letters, (lett) => {
    return `<div class="outline-none bg-zinc-200 border-[0.5px] border-blue-200 select-none text-center font-bold duration-100 h-6">${escape(lett)} </div>`;
  })} ${each($values, (_, i) => {
    return `<input type="text"${add_attribute("value", $values[i], 0)} class="${[
      "outline-none border-[0.5px] border-blue-200 focus:border-black select-none text-center font-bold duration-100",
      ($values[i] == 1 ? "text-blue-800" : "") + " " + ($values[i] == 0 ? "text-orange-800" : "") + " " + ($values[i] == 1 ? "bg-blue-100" : "") + " " + ($values[i] == 0 ? "bg-orange-100" : "")
    ].join(" ").trim()}" style="transition-property: background-color, color" readonly>`;
  })}</div></div></div>`;
});
export {
  Page as default
};
