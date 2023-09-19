<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import init from "$lib/pkg/binary_simplify.js";
    // import { arr_len } from "$lib/pkg/binary_simplify";
    import { simplify_boolean_array } from "$lib/pkg/binary_simplify";

    let input_cols_n = writable(3);
    let ncols = writable(3);
    $: values = writable(Array($ncols * Math.pow(2, $input_cols_n)).fill(0));

    let container: HTMLDivElement;

    let tags: HTMLInputElement[] = [];

    let outs = writable<string[]>([]);

    let ready = false;
    $: {
        let vs = [];
        for (let r = 0; r < $ncols; r++) {
            let vals: number[] = [];
            for (let i = 0; i < $values.length; i += $ncols) {
                vals.push($values[i + r]);
            }
            if (ready) {
                vs.push(simplify_boolean_array(new Uint8Array(vals)));
            }
        }
        if (ready) {
            outs.set(vs);
        }
    }

    onMount(() => {
        tags = [...container.getElementsByTagName("input")];

        init().then(() => {
            ready = true;
            // greet("WebAssembly");
            // alert(bit_len([1, 2]));
            // alert(simplify_boolean_array(new Uint8Array([1, 0, 0, 0])));
        });
    });

    let binvals: number[][] = [];

    $: {
        binvals = [];
        for (let i = 0; i <= Math.pow(2, $input_cols_n) - 1; i++) {
            binvals.push(
                i
                    .toString(2)
                    .padStart($input_cols_n, "0")
                    .split("")
                    .map((x) => parseInt(x))
            );
        }
    }

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let oalphabet = ["X", "Y", "Z", "W", "V", "U", "T", "S", "Q", "R"];
    function focusElement(i: number) {
        if (i < 0 || i >= tags.length) return;
        tags[i].focus();
    }

    $: input_letters = alphabet.slice(0, $input_cols_n);
    $: output_letters = oalphabet.slice(0, $ncols);

    let counts = Array.from({ length: 10 }, (_, i) => i + 1);
</script>

<div class="flex items-start gap-2 p-2">
    <div class="border border-zinc-100 rounded-sm w-56 p-4 flex flex-col gap-4">
        <div>
            <h2 class="text-lg">Input Count</h2>
            <div class="flex gap-1 flex-wrap">
                {#each counts as count}
                    <button
                        on:click={() => {
                            $input_cols_n = count;
                        }}
                        class="rounded-full shadow-sm h-8 w-8 transition-colors duration-175 {count ==
                        $input_cols_n
                            ? 'bg-blue-500 text-white font-bold'
                            : 'bg-blue-100 text-black'}">{count}</button
                    >
                {/each}
            </div>
        </div>
        <div>
            <h2 class="text-lg">Output Count</h2>
            <div class="flex gap-1 flex-wrap">
                {#each counts as count}
                    <button
                        on:click={() => {
                            $ncols = count;
                            // just sorta wait for the DOM
                            // to update. I know this is super hacky.
                            setTimeout(() => {
                                tags = [
                                    ...container.getElementsByTagName("input"),
                                ];
                            }, 250);
                        }}
                        class="rounded-full shadow-sm h-8 w-8 transition-colors duration-175 {count ==
                        $ncols
                            ? 'bg-blue-500 text-white font-bold'
                            : 'bg-blue-100'}">{count}</button
                    >
                {/each}
            </div>
        </div>
        <div>
            {#each $outs as out, i}
                <h2 class="text-lg">Simplified {output_letters[i]}</h2>
                {#if out}
                    <div class="border-[0.5px] border-zinc-400 px-4 rounded-md">
                        {out}
                    </div>
                {/if}
            {/each}
        </div>
    </div>
    <div class="flex font-mono">
        <div
            class="grid grid-cols-4"
            style="grid-template-columns: repeat({$input_cols_n + 1}, 1.6em)"
        >
            <div />
            {#each input_letters as lett}
                <div
                    class="outline-none bg-zinc-200 border-[0.5px] border-blue-200 select-none text-center font-bold duration-100 h-6"
                >
                    {lett}
                </div>
            {/each}
            {#each binvals as row, i}
                <div class=" rounded-full text-xs grid place-items-center">
                    <div
                        class="bg-blue-50 rounded-full w-5 h-5 grid place-items-center font-sans"
                    >
                        {i}
                    </div>
                </div>
                {#each row as bit}
                    <div
                        class="outline-none bg-zinc-200 border-[0.5px] border-blue-200 select-none text-center font-bold duration-100"
                    >
                        {bit}
                    </div>
                {/each}
            {/each}
        </div>
        <div
            class="grid"
            style="grid-template-columns: repeat({$ncols}, 1.6em)"
            bind:this={container}
        >
            {#each output_letters as lett}
                <div
                    class="outline-none bg-zinc-200 border-[0.5px] border-blue-200 select-none text-center font-bold duration-100 h-6"
                >
                    {lett}
                </div>
            {/each}
            {#each $values as _, i}
                <input
                    type="text"
                    value={$values[i]}
                    class="outline-none border-[0.5px] border-blue-200 focus:border-black select-none text-center font-bold duration-100"
                    style="transition-property: background-color, color"
                    class:text-blue-800={$values[i] == 1}
                    class:text-orange-800={$values[i] == 0}
                    class:bg-blue-100={$values[i] == 1}
                    class:bg-orange-100={$values[i] == 0}
                    on:keydown={(e) => {
                        if (e.key == "1" || e.key == "x") {
                            $values[i] = 1;
                        } else if (
                            e.key == "0" ||
                            e.key == "z" ||
                            e.key == "2"
                        ) {
                            $values[i] = 0;
                        } else if (
                            e.key == "!" ||
                            e.key == "~" ||
                            e.key == "`" ||
                            e.key == "f" ||
                            e.key == "Enter"
                        ) {
                            $values[i] = 1 - $values[i];
                        }

                        if (
                            e.key == "ArrowUp" ||
                            e.key == "k" ||
                            e.key == "w"
                        ) {
                            focusElement(i - $ncols);
                        } else if (
                            e.key == "ArrowDown" ||
                            e.key == "j" ||
                            e.key == "s"
                        ) {
                            focusElement(i + $ncols);
                        } else if (
                            e.key == "ArrowLeft" ||
                            e.key == "h" ||
                            e.key == "a"
                        ) {
                            focusElement(i - 1);
                        } else if (
                            e.key == "ArrowRight" ||
                            e.key == "l" ||
                            e.key == "d"
                        ) {
                            focusElement(i + 1);
                        }
                    }}
                    readonly
                />
            {/each}
        </div>
    </div>
</div>
