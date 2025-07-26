/**
 * Runtime data.
 */
export class Runtime {
    /**
     * The functions to be added.
     */
    functions = new Map<string, string>();

    /**
     * The parent runtime.
     */
    parent: Runtime | null = null;

    /**
     * Runtime variables.
     */
    variables = new Map<string, string>();

    /**
     * Gets a variable by name.
     * @param name - The name of the variable.
     * @returns {string | undefined}
     */
    getVar(name: string): string | undefined {
        if (this.parent !== null) return this.parent.getVar(name);
        return this.variables.get(name);
    }

    /**
     * Set a variable in the runtime.
     * @param name - The name of the variable.
     * @param value - The value of the variable.
     * @returns {void}
     */
    setVar(name: string, value: string): void {
        if (this.parent !== null) {
            this.parent.setVar(name, value);
            return;
        }
        
        this.variables.set(name, value);
    }
}